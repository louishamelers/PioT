import time
import pycom
import ubinascii
from machine import I2C, ADC, Pin
from util import bits_to_bytes, random_int, to_percentage

"""
A collection of sensors. Currently implemented are:
    - humidity
    - temperature
    - soil moisture
"""

analog_counter = 0


class AnalogSensor:
    def __init__(self, pin, attn=ADC.ATTN_0DB, vref=3300):
        global analog_counter
        self.pin = pin

        self.adc = ADC(analog_counter)
        self.adc.vref(vref)
        self.adc_channel = self.adc.channel(pin=pin, attn=attn)

        analog_counter += 1

    def read(self):
        self.adc_channel()
        value = self.adc_channel.value()
        return value


class MoistureSensor(AnalogSensor):
    def __init__(self, pin='P13', dry=3550, wet=1300):
        super().__init__(pin, attn=ADC.ATTN_11DB, vref=3300)

        self.dry = dry
        self.wet = wet

    def read(self):
        value = super().read()
        return to_percentage(value, min=self.dry, max=self.wet)


class DHT11:
    def __init__(self, pin):
        self.__last_measurement = time.ticks_ms()
        self.__pin = Pin(pin, mode=Pin.OPEN_DRAIN)
        self.__pin(1)
        self.__humidity = 0
        self.__temperature = 0
        time.sleep(1)

    def __measure(self):
        if time.ticks_ms() - self.__last_measurement < 1000:
            return

        pin = self.__pin

        # pull down to low
        pin(0)
        time.sleep_ms(20)  # changed from 19 to 20

        # listen for pulses on data line
        data = pycom.pulses_get(pin, 100)

        # reset pin
        pin.init(Pin.OPEN_DRAIN)
        pin(1)

        # convert the received pulses to usable bits
        bits = []
        for value, length in data:
            if value == 1 and 18 <= length <= 28:
                bits.append(0)
            if value == 1 and 65 <= length <= 75:
                bits.append(1)

        # should have 40 bits / 5 bytes
        if len(bits) != 40:
            return

        buffer = bits_to_bytes(bits)

        # calculate checksum and check
        checksum = buffer[0] + buffer[1] + buffer[2] + buffer[3] & 255
        if buffer[4] != checksum:
            return

        # humidity, temperature
        self.__humidity = buffer[0]
        self.__temperature = buffer[2]

        self.__last_measurement = time.ticks_ms()

    def temperature(self):
        self.__measure()
        return self.__temperature

    def humidity(self):
        self.__measure()
        return self.__humidity


GY30_ADDRESS = 0x23
GY30_CONTINUOUS_HIGH_RES_MODE = 0x10

DEFAULT_SDA = 'P9'
DEFAULT_SCL = 'P10'


class GY30:
    def __init__(self, sda=DEFAULT_SDA, scl=DEFAULT_SCL):
        self.i2c = I2C(0, pins=(sda, scl))
        self.i2c.init(I2C.MASTER)
        self.i2c.writeto(GY30_ADDRESS, GY30_CONTINUOUS_HIGH_RES_MODE)

    def read(self):
        data = self.i2c.readfrom(GY30_ADDRESS, 2)
        return int(ubinascii.hexlify(data), 16)


class RandomSensor:
    def __init__(self, min=0, max=100):
        self.min = min
        self.max = max

    def read(self):
        return random_int(self.min, self.max)

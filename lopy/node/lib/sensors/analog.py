from machine import ADC

counter = 0


class AnalogSensor:
    def __init__(self, pin, attn=ADC.ATTN_0DB, vref=3300):
        global counter
        self.pin = pin

        self.adc = ADC(counter)
        self.adc.vref(vref)
        self.adc_channel = self.adc.channel(pin=pin, attn=attn)

        counter += 1

    def read(self):
        self.adc_channel()
        value = self.adc_channel.value()
        return value

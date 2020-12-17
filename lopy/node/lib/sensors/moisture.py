from machine import ADC
from util import to_percentage
from sensors.analog import AnalogSensor


class MoistureSensor(AnalogSensor):
    def __init__(self, pin='P13', dry=3550, wet=1300):
        super().__init__(pin, attn=ADC.ATTN_11DB, vref=3300)

        self.dry = dry
        self.wet = wet

    def read(self):
        value = super().read()
        return to_percentage(value, min=self.dry, max=self.wet)

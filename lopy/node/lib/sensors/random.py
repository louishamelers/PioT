from util import random_int


class RandomSensor:
    def __init__(self, min=0, max=100):
        self.min = min
        self.max = max

    def read(self):
        return random_int(self.min, self.max)

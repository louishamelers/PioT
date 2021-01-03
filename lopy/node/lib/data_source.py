import struct

"""
Collects getter method references to combine their values into one dict when asked.
Also provides the capability of encoding the data.
"""


class DataSource:
    def __init__(self):
        self.getters = {}
        self.names = []

    def add_getter(self, getter, name):
        if name not in self.names:
            self.getters[name] = getter
            self.names.append(name)

    def remove_getter(self, name):
        if name in self.names:
            self.getters.pop(name)

    def get_data(self):
        measurements = {}
        for name, getter in self.getters.items():
            measurements[name] = getter()
        return measurements

    # encode all measurements with 2 bytes each
    def get_encoded_data(self):
        encoded = b''
        data = self.get_data()
        # loop through names to ensure the order is maintained
        for name in self.names:
            encoded += struct.pack('>h', round(data[name] * 100))
        return encoded

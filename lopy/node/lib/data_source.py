import struct

"""
Collects getter method references to combine their values into one dict when asked.
Also provides the capability of encoding the data.
"""

INVALID_ENCODING_EXCEPTION = 'Encoding must be either \'integer\' or \'decimal\''


class DataSource:
    def __init__(self):
        self.sources = {}
        self.names = []

    def add(self, getter, name, encoding='integer'):
        # Make sure encoding is valid
        if encoding not in ('integer', 'decimal'):
            raise Exception(INVALID_ENCODING_EXCEPTION)

        # Add or replace source in sources
        self.sources[name] = {"getter": getter, "encoding": encoding}

        # Remove existing source of same name from list
        if name in self.names:
            self.names.remove(name)
        self.names.append(name)

    def remove(self, name):
        if name in self.names:
            self.names.remove(name)
            self.sources.pop(name)

    def get_data(self):
        measurements = {}
        for name, source in self.sources.items():
            measurements[name] = source['getter']()
        return measurements

    # encode all measurements with 2 bytes each
    def get_encoded_data(self):
        encoded = b''
        data = self.get_data()
        # loop through names to ensure the order is maintained
        for name in self.names:
            if self.sources[name]['encoding'] == 'integer':
                encoded += struct.pack('>h', data[name])
            elif self.sources[name]['encoding'] == 'decimal':
                encoded += struct.pack('>h', round(data[name] * 100))
        return encoded

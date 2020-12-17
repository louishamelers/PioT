import struct


class DataSource:
    def __init__(self):
        self.sensors = {}
        self.names = []

    def add_sensor(self, sensor, name):
        if name not in self.names:
            self.sensors[name] = sensor
            self.names.append(name)

    def remove_sensor(self, name):
        if name in self.names:
            self.sensors.pop(name)

    def get_data(self):
        measurements = {}
        for name, sensor in self.sensors.items():
            measurements[name] = sensor.read()
        return measurements

    # encode all measurements with 2 bytes each
    def get_encoded_data(self):
        encoded = b''
        data = self.get_data()
        # loop through names to ensure the order is maintained
        for name in self.names:
            encoded += struct.pack('>h', round(data[name] * 100))
        return encoded

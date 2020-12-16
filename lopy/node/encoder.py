import struct


def encode(data):
    encoded = b''

    # E.g. (10.43) => (1043) => (04 13)
    encoded += struct.pack('>h', round(data['humidity'] * 100))
    # E.g. (-2.43) => (-243) => (FF 0E)
    encoded += struct.pack('>h', round(data['temperature'] * 100))

    return encoded

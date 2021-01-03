import uos

"""
Some util functions
"""


def to_percentage(value, min, max):
    percentage = 100 * ((value - min) / (max - min))
    if percentage >= 100:
        return 100
    if percentage <= 0:
        return 0
    return percentage


def random_int(start, end):
    rnd = int.from_bytes(uos.urandom(1), 'big') / 256
    res = rnd * (end - start) + start
    return res


def bits_to_bytes(bits):
    buffer = []
    byte = 0

    for i in range(0, len(bits)):
        byte = byte << 1
        if (bits[i]):
            byte = byte | 1
        else:
            byte = byte | 0
        if ((i + 1) % 8 == 0):
            buffer.append(byte)
            byte = 0
    return buffer

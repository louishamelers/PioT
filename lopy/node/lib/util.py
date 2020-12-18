import uos


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
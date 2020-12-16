import uos


def random(start, end):
    rnd = int.from_bytes(uos.urandom(1), 'big') / 256
    res = rnd * (end - start) + start
    return res


def get_data():
    hum = random(0, 100)
    tmp = random(-20, 20)

    measurements = {
        'humidity': random(0, 100),
        'temperature': random(-10, 25)
    }
    return measurements

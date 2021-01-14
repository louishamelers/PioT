from data_source import DataSource
from sensors import MoistureSensor, DHT11, RandomSensor
from abp import ABPNode
import config
import pycom
import time
import ubinascii

"""
Initialize three out of four sensors and register them in the data source.
Then start a node that connects to the LoRa WAN, sending data in an interval.
"""


def onData(data):
    # print('data', data)
    if data == bytes([0x00]):
        pycom.rgbled(0x000000)
    elif data == bytes([0x01]):
        pycom.rgbled(0x442200)


if __name__ == "__main__":
    pycom.heartbeat(False)

    # Create sensors
    dht11 = DHT11('P23')
    soilMoisture = MoistureSensor(pin='P13', dry=3550, wet=1300)
    light = RandomSensor(min=0, max=100)

    # Create data source
    ds = DataSource()
    ds.add_getter(dht11.temperature, name='temperature')
    ds.add_getter(dht11.humidity, name='humidity')
    ds.add_getter(soilMoisture.read, name='soilMoisture')
    ds.add_getter(light.read, name='light')

    node = ABPNode(
        dev_addr=config.dev_addr,
        nwk_swkey=config.nwk_swkey,
        app_swkey=config.app_swkey,
        data_source=ds,
        interval=1 * 60,
        onData=onData
    )
    node.start()

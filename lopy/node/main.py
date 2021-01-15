from data_source import DataSource
from sensors import MoistureSensor, DHT11, RandomSensor, GY30
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
    print('Data:', data)
    if data == b'1':
        print('Turning light on')
        pycom.rgbled(0xFFAA00)
    elif data == b'0':
        print('Turning light off')
        pycom.rgbled(0x000000)


if __name__ == "__main__":
    pycom.heartbeat(False)

    # Create sensors
    dht11 = DHT11('P23')
    soilMoisture = MoistureSensor(pin='P13', dry=3550, wet=1300)
    light = GY30()

    # Create data source
    ds = DataSource()
    ds.add(getter=dht11.temperature, name='temperature', encoding='decimal')
    ds.add(getter=dht11.humidity, name='humidity', encoding='decimal')
    ds.add(getter=soilMoisture.read, name='soilMoisture', encoding='decimal')
    ds.add(getter=light.read, name='light', encoding='integer')

    node = ABPNode(
        dev_addr=config.dev_addr,
        nwk_swkey=config.nwk_swkey,
        app_swkey=config.app_swkey,
        data_source=ds,
        interval=5,
        onData=onData
    )
    node.start()

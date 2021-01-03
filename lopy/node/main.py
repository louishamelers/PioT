from data_source import DataSource
from sensors import MoistureSensor, DHT11, RandomSensor
from abp import ABPNode
import config
import pycom
import time


if __name__ == "__main__":
    pycom.heartbeat(False)
    pycom.rgbled(0x123123)

    # Create sensors
    dht11 = DHT11('P23')
    soilMoisture = MoistureSensor(pin='P13', dry=3550, wet=1300)
    light = RandomSensor(min=0, max=100)

    # Create data source
    ds = DataSource(debug=True)
    ds.add_getter(dht11.temperature, name='temperature')
    ds.add_getter(dht11.humidity, name='humidity')
    ds.add_getter(soilMoisture.read, name='soilMoisture')
    ds.add_getter(light.read, name='light')

    node = ABPNode(
        dev_addr=config.dev_addr,
        nwk_swkey=config.nwk_swkey,
        app_swkey=config.app_swkey,
        data_source=ds,
        interval=5
    )
    node.start()

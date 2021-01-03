from data.source import DataSource
from sensors.moisture import MoistureSensor
from sensors.random import RandomSensor
from abp import ABPNode
import config
import pycom
import time


if __name__ == "__main__":
    pycom.heartbeat(False)
    pycom.rgbled(0x123123)

    # Create sensors
    temperature = RandomSensor(min=-10, max=30)
    humidity = RandomSensor(min=0, max=100)
    soilMoisture = MoistureSensor(pin='P13', dry=3550, wet=1300)
    light = RandomSensor(min=0, max=100)

    # Create data source (class that reads and combines all data)
    ds = DataSource(debug=True)
    ds.add_sensor(temperature, name='temperature')
    ds.add_sensor(humidity, name='humidity')
    ds.add_sensor(soilMoisture, name='soilMoisture')
    ds.add_sensor(light, name='light')

    # while True:
    #     m = ds.get_data()
    #     print(m)
    #     time.sleep(1)

    node = ABPNode(
        dev_addr=config.dev_addr,
        nwk_swkey=config.nwk_swkey,
        app_swkey=config.app_swkey,
        data_source=ds,
        interval=5
    )
    node.start()

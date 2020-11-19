import lib.node as node
import lib.config as config
from lib.nanogateway import NanoGateway
import time
import pycom

def run_gateway():
    pycom.heartbeat(False)
    pycom.rgbled(0x002200)
    nanogw = NanoGateway(
        id=config.GATEWAY_ID,
        frequency=config.LORA_FREQUENCY,
        datarate=config.LORA_GW_DR,
        ssid=config.WIFI_SSID,
        password=config.WIFI_PASS,
        server=config.SERVER,
        port=config.PORT,
        ntp_server=config.NTP,
        ntp_period=config.NTP_PERIOD_S
        )
    nanogw.start()

def run_node():
    pycom.heartbeat(False)
    pycom.rgbled(0x000022)
    node.start()

if __name__ == '__main__':
    run_gateway()
    run_node()
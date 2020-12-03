import gateways.config as config
import nodes.abp as abp_node
from gateways.nanogateway import NanoGateway
import pycom

pycom.heartbeat(False)

def run_gateway():
    pycom.rgbled(0x2e0e12)
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
    nanogw._log('You may now press ENTER to enter the REPL')
    input()

def run_abp():
    pycom.rgbled(0x123030)
    print('Starting ABP node...')
    abp_node.start()

run_abp()
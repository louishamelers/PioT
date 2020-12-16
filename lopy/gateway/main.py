from nanogateway import NanoGateway
import config
import pycom

if __name__ == '__main__':
    pycom.heartbeat(False)
    pycom.rgbled(0x110011)
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
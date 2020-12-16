from abp import ABPNode
from encoder import encode
from sensor import get_data
import config
import pycom


if __name__ == "__main__":
    pycom.heartbeat(False)
    pycom.rgbled(0x123123)
    print('Starting ABP Node...')

    node = ABPNode(
        dev_addr=config.dev_addr,
        nwk_swkey=config.nwk_swkey,
        app_swkey=config.app_swkey,
        get_data=get_data,
        encode=encode
    )
    node.start()

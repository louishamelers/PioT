from network import LoRa
import socket
import ubinascii
import struct
import time


"""
Activation by personalization (ABP) node to connect to a LoRa WAN gateway.
Provided a data source, it gets the data and sends it every interval (defualt 10s).
"""


class ABPNode:
    def __init__(self, dev_addr, nwk_swkey, app_swkey, data_source, interval=10, debug=False):
        self.debug = debug

        self.data_source = data_source
        self.interval = interval

        # Initialise LoRa in LORAWAN mode.
        self.lora = LoRa(mode=LoRa.LORAWAN, region=LoRa.EU868)
        lora = self.lora

        # create an ABP authentication params
        self.dev_addr = struct.unpack('>l', ubinascii.unhexlify(dev_addr))[0]
        self.nwk_swkey = ubinascii.unhexlify(nwk_swkey)
        self.app_swkey = ubinascii.unhexlify(app_swkey)

        # join a network using ABP (Activation By Personalisation)
        lora.join(activation=LoRa.ABP, auth=(
            self.dev_addr, self.nwk_swkey, self.app_swkey))

        # remove all the non-default channels
        for i in range(3, 16):
            self.lora.remove_channel(i)

        # set the 3 default channels to the same frequency
        lora.add_channel(0, frequency=868100000, dr_min=0, dr_max=5)
        lora.add_channel(1, frequency=868100000, dr_min=0, dr_max=5)
        lora.add_channel(2, frequency=868100000, dr_min=0, dr_max=5)

        # create a LoRa socket
        self.socket = socket.socket(socket.AF_LORA, socket.SOCK_RAW)
        s = self.socket

        # set the LoRaWAN data rate
        s.setsockopt(socket.SOL_LORA, socket.SO_DR, 5)

    def start(self):
        s = self.socket
        self.running = True

        while (self.running):
            # Get data from sensors...
            data = self.data_source.get_encoded_data()
            if self.debug:
                print('Sending data:', data)

            # Send data to gateway
            s.setblocking(False)

            s.send(data)
            s.setblocking(True)

            # Wait n minutes
            time.sleep(self.interval)

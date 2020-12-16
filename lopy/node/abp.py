from network import LoRa
import socket
import ubinascii
import struct
import time

def encode(data):
    encoded = b''

    # E.g. (10.43) => (1043) => (04 13)
    encoded += struct.pack('>h', round(data['humidity'] * 100))
    # E.g. (-2.43) => (-243) => (FF 0E)
    encoded += struct.pack('>h', round(data['temperature'] * 100))
    
    return encoded

class ABPNode:
    def __init__(self, dev_addr, nwk_swkey, app_swkey, interval=10):
        self.interval = interval

        # Initialise LoRa in LORAWAN mode.
        self.lora = LoRa(mode=LoRa.LORAWAN, region=LoRa.EU868)
        lora = self.lora

        # create an ABP authentication params
        self.dev_addr = struct.unpack('>l', ubinascii.unhexlify(dev_addr))[0]
        self.nwk_swkey = ubinascii.unhexlify(nwk_swkey)
        self.app_swkey = ubinascii.unhexlify(app_swkey)

        # join a network using ABP (Activation By Personalisation)
        lora.join(activation=LoRa.ABP, auth=(self.dev_addr, self.nwk_swkey, self.app_swkey))

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
            measurements = {
                'humidity': 10.43,
                'temperature': -12.11
            }
            data = encode(measurements)

            # Send data to gateway
            s.setblocking(False)
            print('Sending:', data)
            s.send(data)
            s.setblocking(True)

            # Wait n minutes
            time.sleep(self.interval)
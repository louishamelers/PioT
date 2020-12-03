from network import LoRa
import socket
import ubinascii
import struct
import time

def start():
    # Initialise LoRa in LORAWAN mode.
    lora = LoRa(mode=LoRa.LORAWAN, region=LoRa.EU868)

    # create an ABP authentication params
    dev_addr = struct.unpack(">l", ubinascii.unhexlify('26013FC6'))[0]
    nwk_swkey = ubinascii.unhexlify('7BE1D966D1BEAE00E32E99618B740070')
    app_swkey = ubinascii.unhexlify('F1C6F9333F6BBDD08A259538277F7EFA')

    # join a network using ABP (Activation By Personalisation)
    lora.join(activation=LoRa.ABP, auth=(dev_addr, nwk_swkey, app_swkey))

    # remove all the non-default channels
    for i in range(3, 16):
        lora.remove_channel(i)

    # set the 3 default channels to the same frequency
    lora.add_channel(0, frequency=868100000, dr_min=0, dr_max=5)
    lora.add_channel(1, frequency=868100000, dr_min=0, dr_max=5)
    lora.add_channel(2, frequency=868100000, dr_min=0, dr_max=5)

    # create a LoRa socket
    s = socket.socket(socket.AF_LORA, socket.SOCK_RAW)

    # set the LoRaWAN data rate
    s.setsockopt(socket.SOL_LORA, socket.SO_DR, 5)

    # make the socket non-blocking
    s.setblocking(False)

    """ Your own code can be written below! """

    while True:
        data = b"TOM" + bytes([0x01, 0x02, 0x03])
        print('Sending:', data)
        s.send(data)
        time.sleep(4)
        rx = s.recv(256)
        if rx:
            print(rx)
        time.sleep(6)
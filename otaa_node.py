""" OTAA Node example compatible with the LoPy Nano Gateway """
from network import LoRa
import socket
import binascii
import struct
import time

# Initialize LoRa in LORAWAN mode.
lora = LoRa(mode=LoRa.LORAWAN)

"""
Tom here, these are the keys and IDs for my device and application.
You can leave the app stuff, but probably want to replace the device ID
"""
# create an OTA authentication params
dev_eui = binascii.unhexlify('11 22 33 44 55 66 77 88'.replace(' ','')) # these settings can be found from TTN

app_eui = binascii.unhexlify('70 B3 D5 7E D0 03 83 75'.replace(' ','')) # these settings can be found from TTN

app_key = binascii.unhexlify('BA 40 2B 7E 19 46 DB CD 44 27 82 1E C3 6F 09 9C'.replace(' ','')) # these settings can be found from TTN

# set the 3 default channels to the same frequency (must be before sending the OTAA join request)

lora.add_channel(0, frequency=868100000, dr_min=0, dr_max=5)
lora.add_channel(1, frequency=868100000, dr_min=0, dr_max=5)
lora.add_channel(2, frequency=868100000, dr_min=0, dr_max=5)

# join a network using OTAA
lora.join(activation=LoRa.OTAA, auth=(dev_eui, app_eui, app_key), timeout=0)

# wait until the module has joined the network
while not lora.has_joined():
    time.sleep(2.5)
    print('Not joined yet...')

# remove all the non-default channels
for i in range(3, 16):
    lora.remove_channel(i)

# create a LoRa socket
s = socket.socket(socket.AF_LORA, socket.SOCK_RAW)

# set the LoRaWAN data rate
s.setsockopt(socket.SOL_LORA, socket.SO_DR, 5)

# make the socket blocking
s.setblocking(False)

time.sleep(5.0)

""" Your own code can be written below! """
for i in range (200):
    s.send(b'PKT #' + bytes([i]))
    time.sleep(4)
    rx = s.recv(256)
    if rx:
        print(rx)
    time.sleep(6)
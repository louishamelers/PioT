from network import LoRa
import socket
import ubinascii
import struct
import time

# Initialise LoRa in LORAWAN mode.
lora = LoRa(mode=LoRa.LORAWAN, region=LoRa.EU868)

# create an ABP authentication params
dev_addr = struct.unpack(">l", ubinascii.unhexlify('26013FC6'))[0]
nwk_swkey = ubinascii.unhexlify('7BE1D966D1BEAE00E32E99618B740070')
app_swkey = ubinascii.unhexlify('F1C6F9333F6BBDD08A259538277F7EFA')

# join a network using ABP (Activation By Personalization)
lora.join(activation=LoRa.ABP, auth=(dev_addr, nwk_swkey, app_swkey))

# create a LoRa socket
s = socket.socket(socket.AF_LORA, socket.SOCK_RAW)

# set the LoRaWAN data rate
s.setsockopt(socket.SOL_LORA, socket.SO_DR, 0)

# make the socket blocking
# (waits for the data to be sent and for the 2 receive windows to expire)

# send some data
while True:
    s.setblocking(True)
    print('sending data')
    s.send(bytes([0x01, 0x02, 0x03]))
    s.setblocking(False)
    time.sleep(10)

# make the socket non-blocking
# (because if there's no data received it will block forever...)

# get any data received (if any...)
data = s.recv(64)
print(data)
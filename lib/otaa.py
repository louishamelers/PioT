from network import LoRa
import socket
import time
import binascii
import pycom

# set led to red
pycom.heartbeat(False)
pycom.rgbled(0x220000)

lora = LoRa(mode=LoRa.LORAWAN, region=LoRa.EU868)

dev_eui = binascii.unhexlify('70B3D5499708041F')
app_eui = binascii.unhexlify('70B3D57ED0038375')
app_key = binascii.unhexlify('A6B1EC584A958EF0BCA98EECFAC4AE21')

# join a network using OTAA (Over the Air Activation)
lora.join(activation=LoRa.OTAA, auth=(dev_eui, app_eui, app_key), timeout=0)

# wait until the module has joined the network
while not lora.has_joined():
    time.sleep(2.5)
    print('Not yet joined...')

# change led to green
pycom.rgbled(0x002200)
print('Joined')

# create a LoRa socket
s = socket.socket(socket.AF_LORA, socket.SOCK_RAW)

# set the LoRaWAN data rate
s.setsockopt(socket.SOL_LORA, socket.SO_DR, 5)

# make the socket blocking
# (waits for the data to be sent and for the 2 receive windows to expire)
s.setblocking(True)

# send some data
s.send(bytes([0x01, 0x02, 0x03]))

# make the socket non-blocking
# (because if there's no data received it will block forever...)
s.setblocking(False)

# get any data received (if any...)
data = s.recv(64)
print(data)
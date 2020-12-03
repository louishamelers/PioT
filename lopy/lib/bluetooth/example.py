from network import Bluetooth
import ubinascii
import pycom

bluetooth = Bluetooth()
pycom.heartbeat(False)

# scan until we can connect to any BLE device around
pycom.rgbled(0x440000)
bluetooth.start_scan(-1)
adv = None
while True:
    adv = bluetooth.get_adv()
    if adv:
        try:
            pycom.rgbled(0x000044)
            bluetooth.connect(adv.mac)
        except:
            # start scanning again
            pycom.rgbled(0x440000)
            bluetooth.start_scan(-1)
            continue
        break
pycom.rgbled(0x004400)
print("Connected to device with addr = {}".format(ubinascii.hexlify(adv.mac)))
from network import Bluetooth
import ubinascii
import time

def conn_cb (bt_o):
    events = bt_o.events()   # this method returns the flags and clears the internal registry
    if events & Bluetooth.CLIENT_CONNECTED:
        print("Client connected")
    elif events & Bluetooth.CLIENT_DISCONNECTED:
        print("Client disconnected")

def start():
    bluetooth = Bluetooth()
    bluetooth.set_advertisement(name='LoPy', service_uuid=b'1234567890123456')

    bluetooth.callback(trigger=Bluetooth.CLIENT_CONNECTED | Bluetooth.CLIENT_DISCONNECTED, handler=conn_cb)

    bluetooth.advertise(True)
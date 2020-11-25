import ttn
import time
import binascii
from config import access_key

app_id = "iot-plant-solution"

def uplink_callback(msg, client):
  print("Received uplink from ", msg.dev_id)
  print(msg.payload_raw)

handler = ttn.HandlerClient(app_id, access_key)

# using mqtt client
mqtt_client = ttn.MQTTClient(app_id, access_key)
mqtt_client.set_uplink_callback(uplink_callback)
mqtt_client.connect()

print("Connected, waiting for uplink...")
time.sleep(60)
mqtt_client.close()
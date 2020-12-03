import ttn
import time
import binascii
from config import access_key
import base64

app_id = "iot-plant-solution"

def uplink_callback(msg, client):
  print("Received uplink from ", msg.dev_id)
  payload = base64.b64decode(msg.payload_raw)
  print(payload)

handler = ttn.HandlerClient(app_id, access_key)

# using mqtt client
mqtt_client = ttn.MQTTClient(app_id, access_key)
mqtt_client.set_uplink_callback(uplink_callback)
mqtt_client.connect()

print("Connected, waiting for uplink...")
time.sleep(60 * 5)
mqtt_client.close()
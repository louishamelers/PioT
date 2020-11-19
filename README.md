# IoT Project

# Setup

To setup the project, add the config.py file to the /lib directory and insert your own values.

config.py:

```python
# The Gateway EUI witheut the 'eui-'
GATEWAY_ID = "[Your gateway ID]"

# WIFI connection
WIFI_SSID = "[Your WIFI SSID]"
WIFI_PASS = "[Your WIFI password]"


# Keep these on default values for EU
SERVER = "router.eu.thethings.network"
PORT = 1700

NTP = "pool.ntp.org"
NTP_PERIOD_S = 3600

# for EU868
LORA_FREQUENCY = 868100000
LORA_GW_DR = "SF7BW125" # DR_5
LORA_NODE_DR = 5
```

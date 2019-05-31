import subprocess
import paho.mqtt.client as mqtt
import time
import bacnet_data

# Bacnet parameters
bacnet_gateway = '68.181.156.211'
bacnet_ObjectId = '52825'
bacnet_IniFile = '/usr/local/iotm/gateways/bacnet/BACpypes.ini'
mqtt_broker = 'neptune.usc.edu'

pub_client = mqtt.Client()
try:
	print "Connecting to broker"
	pub_client.connect(mqtt_broker, 1883)
    
except Exception as e:
        print "Exception" + str(e)

while (True):

	for sensor in bacnet_data.sensors:

		# Read from BACnet
		print "Reading from " + str(sensor[2])
		
		readPropertyCmd = 'echo \'read ' + bacnet_gateway + ' ' + sensor[0] + ' ' + str(sensor[1]) + \
						' presentValue' + '\' | python ReadProperty.py --ini=' + bacnet_IniFile  

		output = subprocess.check_output(['bash','-c', readPropertyCmd])
		output = output.rstrip('\n')

		print "Value obtained: " + output

		# Write to I3
		print "Writing to " + sensor[2] + '\n'
		pub_client.publish('i3/' + sensor[2], output)

	time.sleep(30)


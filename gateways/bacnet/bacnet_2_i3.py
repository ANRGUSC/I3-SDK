import subprocess
import paho.mqtt.client as mqtt
import time
import socket

# Bacnet parameters
bacnet_gateway = '68.181.156.211'
bacnet_ObjectId = '52825'
bacnet_IniFile = '/usr/local/iotm/gateways/bacnet/BACpypes.ini'
bacnet_objects = [('analogInput', 7), ('analogInput', 21)]

# I3 parameters
i3_broker = 'neptune.usc.edu'
i3_user = 'bacnet_seller'
i3_password = 'j1pgzu'
i3_topics = ['bacnet/temp', 'bacnet/current']

pub_client = mqtt.Client(i3_user)
pub_client.username_pw_set(i3_user, i3_password)
try:
    print "Connecting to broker"
    pub_client.connect(i3_broker, 3883)

except Exception as e:
    print "Exception" + str(e)

while (True):

    i = 0
    for obj in bacnet_objects:
        # Read from BACnet
        print "Reading from " + str(obj)

        readPropertyCmd = 'echo \'read ' + bacnet_gateway + ' ' + obj[0] + ' ' + str(obj[1]) + \
                          ' presentValue' + '\' | python ReadProperty.py --ini=' + bacnet_IniFile

        output = subprocess.check_output(['bash', '-c', readPropertyCmd])
        output = output.rstrip('\n')

        print "Value obtained: " + output

        # Write to I3
        print "Writing to " + i3_topics[i] + '\n'
        pub_client.publish(i3_topics[i], output)

        i = i + 1

    # Sleep for 15 seconds
    time.sleep(15)


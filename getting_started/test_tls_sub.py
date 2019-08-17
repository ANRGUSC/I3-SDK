"""
test_sub.py is an example of a subscriber to a topic
The script requires the user to have the following
1. i3 running instance
2. User name - #Line number 52
3. System generated password - The first time a user creates a product a system generated password would be available - #Line number 53
4. The topic to which data is published - #Line number 54
"""

import paho.mqtt.client as mqtt
import time

logfile = None

def on_connect(client, userdata, flags, rc):
    m = "Connected flags " + str(flags) + " Result code "\
    + str(rc) + " Client_id  " + str(client)
    print(m)

def on_message(client, userdata, msg):
    global logfile

    print "Message received  " + msg.payload

    # if not logfile is None:
    #     logfile.write(str(time.time()) + ',' + msg.payload + ',' + msg.topic + '\n')
    #     logfile.flush()

def test_sub(logfilename=None):
    global logfile

    # account : username created on I3 instance
    # pw : system generated password on the notification bell
    # topic : the product that is bought
    # clientid : this must be unique else the connection would be lost

    clientId = 'ksk_tls_test_subcriber_test'
    account = 'Jeremy'
    topic = 'FICSolarSite'
    pw = '9295tj'

    sub_client = mqtt.Client(clientId)
    sub_client.on_connect = on_connect
    sub_client.on_message = on_message
    sub_client.tls_set("ca.crt", tls_version=2)
    sub_client.tls_insecure_set(True)
    sub_client.username_pw_set(account, pw)
    sub_client.connect('18.217.227.236', 8883, 60) #connect to broker

    sub_client.subscribe(topic)

    if not logfilename is None:
        logfile = open(logfilename, 'w')

    rc = 0
    while rc == 0:
        rc = sub_client.loop()
        time.sleep(1)

if __name__ == '__main__':
    test_sub('sub.log')

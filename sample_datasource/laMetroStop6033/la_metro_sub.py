"""
test_sub.py is an example of a subscriber to a topic
"""

import paho.mqtt.client as mqtt
import time
import os

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

    clientId = 'Default'
    account = 'Default'
    topic = ['Default']
    pw = 'Default'
    port = 1883
    host = 'Default'

    try:
        if os.path.exists('config.ini'):
            fread = open('config.ini', 'r')
            host = str(fread.read()).split("=")[1]
            print "Host :", host
            fread.close()
        if host == 'Default' or port == 'Default' or topic == 'Default' or account == 'Default' or clientId == 'Default':
            print "ERROR: Check host, topic, subscriber and password values"
            print "The subscriber is the username that was used to purchase the product"
            print "The topic is the product which is purchased from the I3 Data market place"
            print "The password is the system generated password when the product is purchased"
            raise Exception(" Default values not changed ")
    
        sub_client = mqtt.Client(clientId)
        sub_client.on_connect = on_connect
        sub_client.on_message = on_message
        sub_client.username_pw_set(account, pw)
        sub_client.connect(host, port, 60) #connect to broker
    except Exception as e:
        print "Exception" + str(e)
        exit(0)

    sub_client.subscribe(topic)
    
    if not logfilename is None:
        logfile = open(logfilename, 'w')
        
    rc = 0
    while rc == 0:
        rc = sub_client.loop()
        time.sleep(1)
        
if __name__ == '__main__':
    test_sub('sub.log')


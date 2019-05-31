"""
test_sub.py is an example of a subscriber to a topic
"""

import paho.mqtt.client as mqtt
import time
import json
from datetime import datetime

logfile = None

def on_connect(client, userdata, flags, rc):
    m = "Connected flags " + str(flags) + " Result code "\
    + str(rc) + " Client_id  " + str(client)
    print(m)

def on_message(client, userdata, msg):
    global logfile
    
    #print "Message received  " + msg.payload
    
    payload_to_dict=json.loads(msg.payload)	
    print "New data sample at: "+ str(datetime.now()) 	
    print "Air Quality (H2, LPG, CH4): " + str(payload_to_dict['gas_mq2'])
    print "Air Quality (Alcohol, Benzine): " + str(payload_to_dict['gas_mq3'])
    print "Air Quality (CO, CH4, Alcohol): " + str(payload_to_dict['gas_mq5'])
    print "Air Quality (LPG, CO, CH4): " + str(payload_to_dict['gas_mq9'])
    print "------------------------------------------------"
    	
    # if not logfile is None:
    #     logfile.write(str(time.time()) + ',' + msg.payload + ',' + msg.topic + '\n')
    #     logfile.flush()

def test_sub(logfilename=None):   
    global logfile
    account = 'buyer'
    #topic = 'JMC_AH1MaTemp.'
    topic = 'airquality'
    pw = 'dstne9'
    
    sub_client = mqtt.Client(account)
    sub_client.on_connect = on_connect
    sub_client.on_message = on_message
    sub_client.username_pw_set(account, pw)
    sub_client.connect('eclipse.usc.edu', 1883, 60) #connect to broker

    sub_client.subscribe(topic)
    
    if not logfilename is None:
        logfile = open(logfilename, 'w')
        
    rc = 0
    while rc == 0:
        rc = sub_client.loop()
        time.sleep(1)
        
if __name__ == '__main__':
    test_sub('sub.log')

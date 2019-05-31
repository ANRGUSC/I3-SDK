"""
test_sub.py is an example of a subscriber to a topic
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
    
    account = 'buyer'
    #topic = 'JMC_AH1MaTemp.'
    topic = 'la'
    pw = 'snzo5t'
    
    sub_client = mqtt.Client(account)
    sub_client.on_connect = on_connect
    sub_client.on_message = on_message
    sub_client.username_pw_set(account, pw)
    sub_client.connect('localhost', 1883, 60) #connect to broker

    sub_client.subscribe(topic)
    
    if not logfilename is None:
        logfile = open(logfilename, 'w')
        
    rc = 0
    while rc == 0:
        rc = sub_client.loop()
        time.sleep(1)
        
if __name__ == '__main__':
    test_sub('sub.log')

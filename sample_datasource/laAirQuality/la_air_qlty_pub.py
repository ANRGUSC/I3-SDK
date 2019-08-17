#!/usr/bin/python
"""
test_sub.py is an example of a publisher subscribing to a topic
"""

import paho.mqtt.client as mqtt
import time
import requests
import json

def on_connect(client, userdata, flags, rc):
    """print out result code when connecting with the broker

    Args:
        client: publisher
        userdata:
        flags:
        rc: result code

    Returns:

    """

    m="Connected flags"+str(flags)+"result code "\
    +str(rc)+"client1_id  "+str(client)
    print(m)



def on_message(client1, userdata, message):
    """print out recieved message

    Args:
        client1: publisher
        userdata:
        message: recieved data

    Returns:

    """
    print("message received  "  ,str(message.payload.decode("utf-8")))


if __name__ == '__main__':

    #TODO: modify topic from email message

    account = 'CCI'
    topic = ['laairquality']
    pw = 'azbpqe'

    try:
        pub_client = mqtt.Client(account)
        pub_client.on_connect = on_connect
        pub_client.on_message = on_message
        pub_client.username_pw_set(account, pw)
        pub_client.connect('localhost', 1883)      #connect to broker
    
    except Exception as e:
        print "Exception" + str(e)

    #pub_client.subscribe(topic)
    #pub_client.loop_start()
    
    url='https://api.waqi.info/feed/losangeles/los-angeles-north-main-street/?token=d01e6a031f61f606d409e3e7d052c4ba676b965a'
    json_data=requests.get(url,verify=False).json()   #Gets data from SODA API
    print(json.dumps(json_data))
    count = 0
    while count < 2:
        count += 1
        pub_client.publish(topic[0], json.dumps(json_data))
 ##       pub_client.publish(topic[1], 'Hello World')
        time.sleep(2)

    pub_client.disconnect()



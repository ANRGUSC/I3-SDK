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

    # account : username created on I3 instance
    # pw : system generated password on the notification bell
    # topic : the product that is bought
    # clientid : this must be unique else the connection would be lost

    clientId = 'clientid_la_weather_pub'
    account = 'CCI'
    topic = ['laweatherhour']
    pw = 'azbpqe'

    try:
        pub_client = mqtt.Client(clientId)
        pub_client.on_connect = on_connect
        pub_client.on_message = on_message
        pub_client.username_pw_set(account, pw)
        pub_client.connect('localhost', 1883)      #connect to broker
    
    except Exception as e:
        print "Exception" + str(e)
    
    url='https://api.weather.gov/gridpoints/LOX/154,44/forecast/hourly'
    json_data=requests.get(url,verify=False).json()   #Gets data from SODA API

    count = 0
    while count < 2:
        count += 1
        pub_client.publish(topic[0], json.dumps(json_data))
        time.sleep(2)

    pub_client.disconnect()



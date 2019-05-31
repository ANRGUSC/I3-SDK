"""
test_sub.py is an example of a publisher subscribing to a topic
subscriber info: account = 'iotpublisher16@gmail.com'
password = 'toypublisher'
"""


import paho.mqtt.client as mqtt
import time
import json
import requests

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

    account = 'seller'
    pw = 'zdacm8'
    topic = 'i3/lacity/air_quality'
    

    #connect to broker
    try:
        pub_client = mqtt.Client(account)
        pub_client.on_connect = on_connect
        pub_client.on_message = on_message
        pub_client.username_pw_set(account, pw)
        pub_client.connect('localhost', 1883)      
    
    except Exception as e:
        print "Exception" + str(e)

    #get json data from api endpoint

    url='https://api.waqi.info/feed/losangeles/los-angeles-north-main-street/?token=d01e6a031f61f606d409e3e7d052c4ba676b965a'
   
    json_data=requests.get(url,verify=False).json()
    
    #publish
    pub_client.publish(topic, json.dumps(json_data))
 

pub_client.disconnect()

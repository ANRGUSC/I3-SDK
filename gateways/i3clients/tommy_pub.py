"""
tommy_pub.py is an example of a publisher of tommy trojan area pictures

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

    

    account = 'seller'
    pw = 'zdacm8'
    topic = 'i3/usc/tommy_cam'
    

    #connect to broker
    try:
        pub_client = mqtt.Client(account)
        pub_client.on_connect = on_connect
        pub_client.on_message = on_message
        pub_client.username_pw_set(account, pw)
        pub_client.connect('neptune.usc.edu', 1883)      
    
    except Exception as e:
        print "Exception" + str(e)

    #get json data from api endpoint

    url='http://web-app.usc.edu/ws/webcams/api/tommycam/stills'
   
    json_data=requests.get(url,verify=False).json()
    
    #publish
    pub_client.publish(topic, json.dumps(json_data))
 
    print json.dumps(json_data)

pub_client.disconnect()

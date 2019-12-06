import paho.mqtt.client as mqtt
import time
import os

def on_connect(client, userdata, flags, rc):    
    print("Result from connect: {}".format(mqtt.connack_string(rc)))
    client.subscribe(topic[0])


def on_subscribe(client, userdata, mid, granted_qos):    
    print("Subscribed")


def on_message(client, userdata, msg):
    print("Message received. Topic: {}. Payload: {}".format(msg.topic, str(msg.payload)))

if __name__ == "__main__":

    #TODO: add details here for connection
    #account refers to username on i3 Marketplace of the subscriber
    #pw referes to password obtained in the notification tray
    #host refers to MQTT broker
    account = 'muser2'
    topic = ['muser1/testhub1996/topic1996']
    pw = 'xgndw220kwuh'
    port = 1883
    host = '18.219.4.146'

try:
        if os.path.exists('config.ini') :
            fread = open('config.ini','r')
            host= str(fread.read()).split("=")[1]
            print ("Host :", host)
            fread.close()
        if host == 'Default' or port == 'Default' or topic == 'Default' or account == 'Default':
            print ("ERROR: Check host, topic, account and password values")
            print ("The account is the username of the subscriber on i3 Marketplace")
            print ("The topic is the full-name of the product which is purchased from the I3 Data market place")
            print ("The password is the system generated password when the product is purchased")
            raise Exception(" Default values not changed ")

        client = mqtt.Client(protocol=mqtt.MQTTv311)    
        client.on_connect = on_connect    
        client.on_subscribe = on_subscribe    
        client.on_message = on_message
        client.username_pw_set(account, pw)
        client.connect(host, port)   
        client.loop_forever()

except Exception as e:
    print ("Exception" + str(e))
    exit(-1)

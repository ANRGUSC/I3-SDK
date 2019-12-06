import paho.mqtt.client as mqtt
import time
import os


if __name__ == "__main__":

    #TODO: add details here for connection
    #account refers to full device name under the hubs section of the topic 
    #pw referes to password added while creating device (API_key and asymmetric public key)
    #host refers to MQTT broker
    account = 'muser1$testhub1996$device77'
    topic = ['muser1/testhub1996/topic1996']
    pw = 'polish7'
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
            print ("The account is the device name registered under the hub containing the topic on i3 Marketplace")
            print ("The topic is the full-name of the product which is purchased from the I3 Data market place")
            print ("The password is the system generated password when the product is purchased")
            raise Exception(" Default values not changed ")

        client = mqtt.Client(protocol=mqtt.MQTTv311)
        client.username_pw_set(account, pw)
        client.connect(host, port)
        print("Connected to broker") 
        client.publish(topic[0], payload="I3 Marketplace")
        print("Published")

except Exception as e:
    print ("Exception" + str(e))
    exit(-1)

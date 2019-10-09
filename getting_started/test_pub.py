"""
test_sub.py is an example of a publisher subscribing to a topic
The script requires the user to have the following
1. i3 running instance
2. User name - #Line number 52
3. System generated password - The first time a user creates a product a system generated password would be available - #Line number 53
4. The topic to which data is published - #Line number 54
Please check for config.ini text file for test server details
"""

import paho.mqtt.client as mqtt
import time
import os

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



def on_message(client, userdata, message):
    """print out recieved message
    Args:
        client: publisher
        userdata:
        message: recieved data
    Returns:
    """
    print("Message received  ", str(message.payload.decode("utf-8")))


if __name__ == '__main__':

    #TODO: modify account / username
    #TODO: modify topic
    #TODO: modify system generated password
    # account : username created on I3 instance
    # pw : system generated password on the notification bell
    # topic : the product that is bought
    # clientid : this must be unique else the connection would be lost

    clientId = 'SpencerMcD$testCSDK$testC1'
    account = 'SpencerMcD'
    topic = ['SpencerMcD/testCSDK/testProd1']
    pw = '1234567'
    port = 1883
    host = 'Default'

    try:
        if os.path.exists('config.ini') :
            fread = open('config.ini','r')
            host= str(fread.read()).split("=")[1]
            print("Host : ", host)
            fread.close()
        if host == 'Default' or port == 'Default' or topic == 'Default' or account == 'Default' or clientId == 'Default' :
            print("ERROR: Check host, topic, subscriber and password values")
            print("The subscriber is the username that was used to purchase the product")
            print("The topic is the product which is purchased from the I3 Data market place")
            print("The password is the system generated password when the product is purchased")
            raise Exception(" Default values not changed ")

        pub_client = mqtt.Client(account)
        pub_client.on_connect = on_connect
        pub_client.on_message = on_message
        pub_client.username_pw_set(clientId, pw)
        pub_client.connect(host, port)      #connect to broker
    
    except Exception as e:
        print("Exception" + str(e))
        exit(-1)

    #pub_client.subscribe(topic)
    #pub_client.loop_start()
    # Update the message to be published.
    count = 0
    while count < 1000:
        count += 1
        pub_client.publish(topic[0], 'Hello World testing')
        #pub_client.publish(topic[1], 'Hello World')
        time.sleep(2)

    pub_client.disconnect()
    
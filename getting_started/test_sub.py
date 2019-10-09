"""
test_sub.py is an example of a subscriber to a topic
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

logfile = None

def on_connect(client, userdata, flags, rc):
    m = "Connected flags " + str(flags) + " Result code "\
    + str(rc) + " Client_id  " + str(client)
    print(m)

def on_message(client, userdata, message):
    global logfile
    
    """print out recieved message
    Args:
        client: publisher
        userdata:
        message: recieved data
    Returns:
    """
    print("Message received  ", str(message.payload.decode("utf-8")))
    
    # if not logfile is None:
    #     logfile.write(str(time.time()) + ',' + str(message.payload.decode("utf-8")) + ',' + msg.topic + '\n')
    #     logfile.flush()

def test_sub(logfilename=None):   
    global logfile

    #TODO: modify clientID
    #TODO: modify account
    #TODO: modify topic
    #TODO: modify pw
    # clientid : your full device ID string
    # account : username created on I3 instance
    # topic : the product that is has been bought (full string)
    # pw : system generated password under the notification bell
    # e.g. as follows:
        # clientId = 'my_account_name$my_hub_name$my_device_name'
        # account = 'my_account_name'
        # topic = ['topic_owner_account_name/topic_owner_hub_name/product_name']
        # pw = 'generated_api_key' (find in notifications after subscribing to topic)'

    clientId = 'Default'
    account = 'Default'
    topic = ['Default']
    pw = 'Default'
    port = 1883
    host = 'Default'

    try:
        if os.path.exists('config.ini') :
            fread = open('config.ini','r')
            host= str(fread.read()).split("=")[1]
            print("Host :", host)
            fread.close()
        if host == 'Default' or port == 'Default' or topic == 'Default' or account == 'Default' or clientId == 'Default' :
            print("ERROR: Check host, topic, subscriber and password values")
            print("The subscriber is the username that was used to purchase the product")
            print("The topic is the product which is purchased from the I3 Data market place")
            print("The password is the system generated password when the product is purchased")
            raise Exception(" Default values not changed ")

        sub_client = mqtt.Client(clientId)
        sub_client.on_connect = on_connect
        sub_client.on_message = on_message
        sub_client.username_pw_set(account, pw)
        sub_client.connect(host, port, 60) #connect to broker

    except Exception as e:
        print("Exception" + str(e))
        exit(-1)

    sub_client.subscribe(topic[0])
    
    if not logfilename is None:
        logfile = open(logfilename, 'w')
        
    rc = 0
    while rc == 0:
        rc = sub_client.loop()
        time.sleep(1)
        
if __name__ == '__main__':
    test_sub('sub.log')

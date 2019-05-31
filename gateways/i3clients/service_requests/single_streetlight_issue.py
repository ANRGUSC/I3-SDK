#Publishes service requests.
import paho.mqtt.client as mqtt
import requests
import urllib
import json
import time
import datetime
import schedule


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

def publish_data():
    """ This method implements the other methods to connect to the broker and publishes data obtained from the url.
        """
    account = 'seller'
    pw = 'zdacm8'
    topic = 'i3/lacity/service_requests/single_streetlight_issue'

    #Establish update time
    t = datetime.datetime.now() - datetime.timedelta(hours = 3)
    earliest_createddate = t.strftime('%Y-%m-%dT%H:%M:%S.000')
    print earliest_createddate

 
    #Connect to broker
    try:
        pub_client = mqtt.Client(account)
        pub_client.on_connect = on_connect
        pub_client.on_message = on_message
        pub_client.username_pw_set(account, pw)
        pub_client.connect("localhost",1883,60)      
    
    except Exception as e:
        print "Exception" + str(e)

    #Get data from SODA API
    url='https://data.lacity.org/resource/d4vt-q4t5.json?$where=createddate > "'  +  earliest_createddate  + '" AND requesttype = "Single Streetlight Issue"'
    
    json_data=requests.get(url,verify=False).json()
  

    #Publish data
    for i in json_data:
        pub_client.publish(topic, json.dumps(i))
        time.sleep(.1)

    #pub_client.disconnect()


if __name__ == '__main__':
    """ Schedules and runs publish_data() every 2 hours.
        """

    publish_data()
    schedule.every(2).hours.do(publish_data)
    while True:
        schedule.run_pending()
        time.sleep(10)

    pub_client.disconnect()




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


def publish_data(request_type,offset,topic_name):

    topic = topic_name
    #Connect to broker
    try:
        pub_client = mqtt.Client()
        pub_client.on_connect = on_connect
        pub_client.connect("localhost",1883,60)      
    
    except Exception as e:
        print "Exception" + str(e)


    #Establish update time
    t = datetime.datetime.now() - datetime.timedelta(hours = 0)
    earliest_createddate = t.strftime('%Y-%m-%dT%H:%M:%S.000')
    print earliest_createddate


    #Get data from SODA API
    #url='https://data.lacity.org/resource/d4vt-q4t5.json?$where=createddate > "'  +  earliest_createddate  + '" AND requesttype = "' + request_type + '"'
    

    #url='https://data.lacity.org/resource/d4vt-q4t5.json?$limit=40&$offset=' + str(offset) + '&$order=createddate DESC AND requesttype = "' + request_type + '"'

    url='https://data.lacity.org/resource/d4vt-q4t5.json?$limit=20&$order=createddate DESC&$where=requesttype = "' + request_type + '"' 

    json_data=requests.get(url,verify=False).json()
  

    #Publish data
   # pub_client.publish(topic,json.dumps(json_data))

    for i in json_data:
        pub_client.publish(topic, json.dumps(i))
        time.sleep(.1)

    pub_client.disconnect()


if __name__ == '__main__':

    publish_data("Bulky Items",0,'b')
    publish_data("Homeless Encampment", 0,'h')
    publish_data("Graffiti Removal", 0,'g')
    publish_data("Electronic Waste", 0,'e')
    publish_data("Illegal Dumping Pickup", 0, 'i')
    publish_data("Dead Animal Removal", 0, 'd')
    publish_data("Metal/Household Appliances", 0, 'm')
    publish_data("Report Water Waste", 0, 'w')
    publish_data("Single Streetlight Issue", 0, 'ss')
    publish_data("Multiple Streetlight Issue", 0, 'ms')




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


def publish_data(request_type,time_delta,topic_name):

    topic = topic_name
    #Connect to broker
    try:
        pub_client = mqtt.Client()
        pub_client.on_connect = on_connect
        pub_client.connect("localhost",1883,60)      
    
    except Exception as e:
        print "Exception" + str(e)


    #Establish update time
    t = datetime.datetime.now() - datetime.timedelta(hours = time_delta)
    earliest_createddate = t.strftime('%Y-%m-%dT%H:%M:%S.000')
    print earliest_createddate


    #Get data from SODA API
    url='https://data.lacity.org/resource/d4vt-q4t5.json?$where=createddate > "'  +  earliest_createddate  + '" AND requesttype = "' + request_type + '"'
    
    json_data=requests.get(url,verify=False).json()
  

    #Publish data
    for i in json_data:
        pub_client.publish(topic, json.dumps(i))
        time.sleep(.1)

    pub_client.disconnect()


if __name__ == '__main__':

    publish_data("Bulky Items",15,'b')
    publish_data("Homeless Encampment", 24,'h')
    publish_data("Graffiti Removal", 59,'g')
    publish_data("Electronic Waste", 16,'e')
    publish_data("Illegal Dumping Pickup", 56, 'i')
    publish_data("Dead Animal Removal", 24, 'd')
    publish_data("Metal/Household Appliances", 24, 'm')
    publish_data("Report Water Waste", 24, 'w')
    publish_data("Single Streetlight Issue", 24, 'ss')
    publish_data("Multiple Streetlight Issue", 24, 'ms')





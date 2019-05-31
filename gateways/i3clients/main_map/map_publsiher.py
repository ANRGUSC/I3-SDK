"""
test_sub.py is an example of a publisher subscribing to a topic
"""
import requests
import json
import paho.mqtt.client as mqtt
import time
import urllib
from publisher import Publisher


def make_message(request_type):

    # get json object from url
    url='https://data.lacity.org/resource/d4vt-q4t5.json?$limit=20&$offset=0&$order=createddate DESC&$where=requesttype = "' + request_type + '"' 
    json_data=requests.get(url,verify=False).json()

    updates = []
    for i in json_data:
	updates.append(i)
    message = ''


    data = []
    for i in updates:
	datai = {}
	datai['requesttype'] = i['requesttype']
	if 'policeprecinct'in i:
	    datai['policeprecinct'] = i['policeprecinct']
	if 'actiontaken'in i:
	    datai['actiontaken'] = i['actiontaken']
	if 'createddate'in i:
	    datai['createddate'] = i['createddate']
	if 'location'in i:
   	    datai['lng'] = i['location']['longitude']
	    datai['lat'] = i['location']['latitude']
	    if 'address' in i:
		datai['address'] = i['address']
    	    data.append(datai)
	elif 'address' in i:
	    datai['address'] = i['address']
	    ad = i['address'].replace(' ','+')
	    add = ad.replace(',','')
	    loc_url='http://maps.google.com/maps/api/geocode/json?address=' + add
	    try:
	        json_loc=requests.get(loc_url,verify=False).json()
		datai['lng'] = json_loc['results'][0]['geometry']['location']['lng']
		datai['lat'] = json_loc['results'][0]['geometry']['location']['lat']
		data.append(datai)
	    except Exception as e:
		print "Exception data: " + str(e)
		print i['requesttype'] + '   ' + add
		try:
			json_loc=requests.get(loc_url,verify=False).json()
			datai['lng'] = json_loc['results'][0]['geometry']['location']['lng']
			datai['lat'] = json_loc['results'][0]['geometry']['location']['lat']
			data.append(datai)
		except Exception as e:
			print "Exception data: " + str(e)
			print i['requesttype'] + '   ' + add

    for d in data:
	message = message + json.dumps(d) + '\n'

    return message


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
    account = 'la_seller'
    pw = 'ts9pes'

    try:
        pub_client = mqtt.Client(account)
        pub_client.on_connect = on_connect
        pub_client.on_message = on_message
        pub_client.username_pw_set(account, pw)
        pub_client.connect('neptune.usc.edu', 3883)      #connect to broker
    
    except Exception as e:
        print "Exception " + str(e)    

    while True:
        messB = make_message('Bulky Items')
        messD = make_message('Dead Animal Removal')
        messE = make_message('Electronic Waste')
        messG = make_message('Graffiti Removal')
        messH = make_message('Homeless Encampment')
        messI = make_message('Illegal Dumping Pickup')
        messM = make_message('Metal/Household Appliances')
        messMS = make_message('Multiple Streetlight Issue')
        messW = make_message('Report Water Waste')
        messSS = make_message('Single Streetlight Issue')

        pub_client.publish('la/bulky_items', messB)
        pub_client.publish('la/electronic_waste', messE)
        pub_client.publish('la/dead_animal_removal', messD)
        pub_client.publish('la/graffiti_removal', messG)
        pub_client.publish('la/homeless_encampment', messH)
        pub_client.publish('la/illegal_dumping_pickup', messI)
        pub_client.publish('la/metal-household_appliances', messM)
        pub_client.publish('la/multiple_streetlight_issue', messMS)
        pub_client.publish('la/report_water_waste', messW)
        pub_client.publish('la/single_streetlight_issue', messSS)    

        time.sleep(15)



    #get json object from url
    #url='https://data.lacity.org/resource/d4vt-q4t5.json?$limit=20&$offset=0&$order=createddate DESC&$where=requesttype = "' + 'Electronic Waste' + '"' 
    #json_data=requests.get(url,verify=False).json()
    #for i in json_data:
        #pub_client.publish(topic[0], json.dumps(i))
        #time.sleep(1)

    pub_client.disconnect()


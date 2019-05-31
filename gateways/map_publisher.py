import requests
import json
import paho.mqtt.client as mqtt
import time
import urllib
from pub_client import Pub_client
import sys


def make_message(request_type):
    # get json object from url
    url='https://data.lacity.org/resource/d4vt-q4t5.json?$limit=20&$offset=0&$order=createddate DESC&$where=requesttype = "' + request_type + '"' 
    updates=requests.get(url,verify=False).json()

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
		time.sleep(0.05)
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

    message = ''
    for d in data:
	message = message + json.dumps(d) + '\n'
    return message

def publish_messages(publisher):
	publisher.publish_to_topic('bulky_items',make_message('Bulky Items'))
	publisher.publish_to_topic('dead_animal_removal',make_message('Dead Animal Removal'))
	publisher.publish_to_topic('electronic_waste',make_message('Electronic Waste'))
	publisher.publish_to_topic('graffiti_removal',make_message('Graffiti Removal'))
	publisher.publish_to_topic('homeless_encampment',make_message('Homeless Encampment'))
	publisher.publish_to_topic('illegal_dumping_pickup',make_message('Illegal Dumping Pickup'))
	publisher.publish_to_topic('metal-household_appliances',make_message('Metal/Household Appliances'))
	publisher.publish_to_topic('multiple_streetlight_issue',make_message('Multiple Streetlight Issue'))
	publisher.publish_to_topic('report_water_waste',make_message('Report Water Waste'))
	publisher.publish_to_topic('single_streetlight_issue',make_message('Single Streetlight Issue'))

def publish_messages_webservice():
	url = "http://neptune.usc.edu:8085/mqtt/publish?message=hello&topic=la"
	#r = requests.get(url)
	#r = requests.get('http://neptune.usc.edu:8085/mqtt/subscribe?callbackUrl=http://207.151.35.4:80&topic=la')
	#print r.text
	s = requests.get(url)
	print s.text

def run_map_pub():
	map_pub = Pub_client('neptune.usc.edu',1883)
	publish_messages(map_pub)
	map_pub.disconnect()
	

if __name__ == '__main__':
    account = 'la_seller'
    pw = 'ts9pes'
   
    #publish_messages_webservice()
    print sys.path

    #client = Client('neptune.usc.edu',1883,account,pw)
    #while True:
	#publish_messages(client)
	#time.sleep(60)
    #client.disconnect()






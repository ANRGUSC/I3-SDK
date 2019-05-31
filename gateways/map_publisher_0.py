import requests
import json
import paho.mqtt.client as mqtt
import time
import datetime
import urllib
from pub_client import Pub_client
from web_pub import Web_pub
import sys



station_locs = {
	"ALATADENA":{"lat":34.1896138,"lng":-118.1325341},
	"AVALON":{"lat":33.34311,"lng":-118.327168},
	"CARSON":{"lat":33.8344355,"lng":-118.2630437},
	"CENTURY":{"lat":33.9283408,"lng":-118.2287569},
	"COMPTON":{"lat":33.8940121,"lng":-118.2246516},
	"CERRITOS":{"lat":33.8662065,"lng":-118.065961},
	"CRESCENTA VALLEY":{"lat":34.221141,"lng":-118.2303951},
	"EAST LOS ANGELES":{"lat":34.0343921,"lng":-118.1577683},
	"INDUSTRY":{"lat":34.0249698,"lng":-117.9587948},
	"LAKEWOOD":{"lat":33.8512171,"lng":-118.1331075},
	"LANCASTER":{"lat":34.6988793,"lng":-118.1377853},
	"LOMITA":{"lat":33.7856262,"lng":-118.3207155},
	"MALIBU/LOST HILLS":{"lat":34.13744,"lng":-118.7146327},
	"MARINA DELREY":{"lat":33.9708427,"lng":-118.4457239},
	"NORWALK":{"lat":33.9142193,"lng":-118.0693806},
	"PALMDALE":{"lat":34.5861624,"lng":-118.1170673},	
	"PICO RIVERA":{"lat":33.9817133,"lng":-118.0887905},
	"SAN DIMAS":{"lat":34.1047702,"lng":-117.8021421},
	"SANTA CLARITA":{"lat":34.4155084,"lng":-118.5510359},
	"SOUTH LOS ANGELES":{"lat":33.9298751,"lng":-118.2983812},
	"TEMPLE":{"lat":34.1030474,"lng":-118.0758157},
	"WALNUT DIAMOND BAR":{"lat":34.0289283,"lng":-117.8343212},
	"WEST HOLLYWOOD":{"lat":34.0843995,"lng":-118.3833709},
	};



def send_messages(client):
    data = make_mess_aqi()
    client.publish_to_topic(data['topic'],data['message'])
    data = make_mess_aqir()
    client.publish_to_topic(data['topic'],data['message'])
    send_messages_0(client)
    

def make_mess_aqi():
    url='https://api.waqi.info/feed/losangeles/los-angeles-north-main-street/?token=d01e6a031f61f606d409e3e7d052c4ba676b965a'
    json_data=requests.get(url,verify=False).json()
    #print json.dumps(json_data)
    data={}
    data['topic'] = 'aqi_main'
    data['message'] = {'aqi':json_data['data']['aqi'],'lat':34.06653,'lng':-118.22676}
    data['message'] = json.dumps(data['message'])
    print json.dumps(data);
    return data;

def make_mess_aqir():
    url='https://api.waqi.info/feed/losangeles/reseda/?token=d01e6a031f61f606d409e3e7d052c4ba676b965a'
    json_data=requests.get(url,verify=False).json()
    #print json.dumps(json_data)
    data={}
    data['topic'] = 'aqi_reseda'
    data['message'] = {'aqi':json_data['data']['aqi'],'lat':34.1992,'lng':-118.53275}
    data['message'] = json.dumps(data['message'])
    print json.dumps(data);
    return data;




def make_crime_mess():
    #Establish update time
    t = datetime.datetime.now() - datetime.timedelta(minutes = 60) - datetime.timedelta(days = 14)
    u = datetime.datetime.now() - datetime.timedelta(days=14)
    earliest_createddate = t.strftime('%Y-%m-%dT%H:%M:%S.000')
    latest_createddate = u.strftime('%Y-%m-%dT%H:%M:%S.000')
    print earliest_createddate
    print latest_createddate
    #Get data from SODA API
    url ='https://data.lacounty.gov/resource/uvdj-ch3p.json?$order=crime_date ASC&$where=crime_date > "'+str(earliest_createddate)+'" AND crime_date < "'+str(latest_createddate)+'"'
    updates=requests.get(url,verify=False).json()
    data = []
    for i in updates:
	datai = {}
	datai['requesttype'] = 'Crime'
	datai['crime_category_description'] = i['crime_category_description']
	datai['crime_date'] = i['crime_date']
	datai['station_name'] = i['station_name']
	if 'geo_location' in i:
	    if 'coordinates' in i['geo_location']:
		datai['lat'] = i['geo_location']['coordinates'][1]
		datai['lng'] = i['geo_location']['coordinates'][0]
		data.append(datai)	
	elif 'station_name'in i and 'station_name' in station_locs:
	    datai['lat'] = station_locs[i['station_name']]['lat']
	    datai['lng'] = station_locs[i['station_name']]['lng']
	    data.append(datai)

    print str(len(data)) + ' crimes'

    return data

def send_crime_mess(data):
    client = Web_pub('broker.hivemq.com',8000)

    for i in range (0,len(data)):
	try:
            client.publish_to_topic('Crime',json.dumps(data[i]))
	    time.sleep(2)
	except Exception as e:
	    print "Publisher exception: " + str(e)
	
def traffic_incidents():
    url='http://dev.virtualearth.net/REST/v1/Traffic/Incidents/32.8007,-118.243683,34.8233,-117.6462?key=AjvzGWtIXBSVdyDnhYaa7BeqI69-XjgmSenOK4J44U7j_ckKQsb8OCA4EwH31Otr'
    updates=requests.get(url,verify=False).json()

    n = 0
    data = []
    for i in range(0,len(updates)):
	datai = {}
	datai['lat'] = updates['resourceSets'][0]['resources'][i]['point']['coordinates'][0]
	datai['lng'] = updates['resourceSets'][0]['resources'][i]['point']['coordinates'][1]
	datai['description'] = updates['resourceSets'][0]['resources'][i]['description']
	datai['topic'] = 'traffic_incidents'
	data.append(datai)
    print 'traffic incidents '+str(len(data))
    for d in range(0,len(data)):
        print json.dumps(data[d])
    return data





    

def make_message_sr():
    #Establish update time
    t = datetime.datetime.now() - datetime.timedelta(minutes = 10) - datetime.timedelta(days = 7)
    u = datetime.datetime.now() - datetime.timedelta(days=7)
    earliest_createddate = t.strftime('%Y-%m-%dT%H:%M:%S.000')
    latest_createddate = u.strftime('%Y-%m-%dT%H:%M:%S.000')
    print earliest_createddate
    print latest_createddate

    #Get data from SODA API
    url ='https://data.lacity.org/resource/d4vt-q4t5.json?$order=createddate ASC&$where=createddate > "'  +  earliest_createddate  + '" AND createddate < "'+latest_createddate+'"'
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
		print "Exception: " + str(e)
		print i['requesttype'] + '   ' + add
   
    print str(len(data)) + ' service requests'
    #for i in range(0,len(data)):
	#print json.dumps(data[i])
    return data


   



def send_messages_0(client):

    #traffic = traffic_incidents()
    #for i in range (0,len(traffic)):
	#client.publish_to_topic(traffic[i]['topic'],json.dumps(traffic[i]))
	#time.sleep(2)

    crimes = make_crime_mess()
    print len(crimes)
    data = make_message_sr()
    print len(data)
    if len(crimes) > len(data):
	interval = len(crimes)/len(data)
    else: 
        interval = len(data)/len(crimes)
        
    c = 0
    for i in range (0,len(data)):
	try:
	    if i%interval is 0:
		client.publish_to_topic(crimes[c]['requesttype'],json.dumps(crimes[c]))
		c = c+1
		i=i=1
		time.sleep(1.5)
            client.publish_to_topic(data[i]['requesttype'],json.dumps(data[i]))
	except Exception as e:
	    print "Publisher exception: " + str(e)
	    print data[i]['requesttype']
	if i < len(data)-1:
    	    #first created date
    	    start_time = datetime.datetime.strptime(data[i]['createddate'], '%Y-%m-%dT%H:%M:%S')
            next_time = datetime.datetime.strptime(data[i+1]['createddate'], '%Y-%m-%dT%H:%M:%S')
	    time.sleep(((next_time - start_time).total_seconds()/10) + 0.2)
	    #time.sleep(0.2)	

def send_one_message():
    client = Web_pub('broker.hivemq.com',8000)	
    client.publish_to_topic('la','{"policeprecinct": "WEST VALLEY", "requesttype": "Bulky Items", "address": "GLORIA AVE AT WYANDOTTE ST, 91406", "actiontaken": "SR Created", "createddate": "2017-08-10T09:02:48", "lat": "34.2029846502", "lng": "-118.479338011"}')

if __name__ == '__main__':
 

    #traffic = traffic_incidents()
    client = Web_pub('broker.hivemq.com',8000)
    #client.publish_to_topic('aqi',make_mess_aqi())
    #client.publish_to_topic('aqir',make_mess_aqir())

    #time.sleep(10)
    send_messages(client)
    #send_one_message()

    #client.disconnect()







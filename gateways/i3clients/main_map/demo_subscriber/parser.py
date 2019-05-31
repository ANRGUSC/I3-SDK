import requests
import json
import time
import datetime
import urllib


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
	"MARINA DEL REY":{"lat":33.9708427,"lng":-118.4457239},
	"NORWALK":{"lat":33.9142193,"lng":-118.0693806},
	"PALMDALE":{"lat":34.5861624,"lng":-118.1170673},	
	"PICO RIVERA":{"lat":33.9817133,"lng":-118.0887905},
	"SAN DIMAS":{"lat":34.1047702,"lng":-117.8021421},
	"SANTA CLARITA VALLEY":{"lat":34.4155084,"lng":-118.5510359},
	"SOUTH LOS ANGELES":{"lat":33.9298751,"lng":-118.2983812},
	"TEMPLE":{"lat":34.1030474,"lng":-118.0758157},
	"WALNUT DIAMOND BAR":{"lat":34.0289283,"lng":-117.8343212},
	"WEST HOLLYWOOD":{"lat":34.0843995,"lng":-118.3833709},
	}



def make_arrays(outfilename):
    outfile = open(outfilename,'w+')
    outfile.write('var aqi = [\n')

    url='https://api.waqi.info/feed/losangeles/los-angeles-north-main-street/?token=d01e6a031f61f606d409e3e7d052c4ba676b965a'
    json_data=requests.get(url,verify=False).json()
    #print json.dumps(json_data)
    data={}
    data['lat'] = 34.06653
    data['lng'] = -118.22676
    data['aqi'] = json_data['data']['aqi']
    json.dump(data, outfile)
    outfile.write(',\n')

    url='https://api.waqi.info/feed/losangeles/reseda/?token=d01e6a031f61f606d409e3e7d052c4ba676b965a'
    json_data=requests.get(url,verify=False).json()
    data['lat'] = 34.1992
    data['lng'] = -118.53275
    data['aqi'] = json_data['data']['aqi']
    json.dump(data, outfile)
    outfile.write(',\n')
    outfile.write(']\n\n')
    
    outfile.write('var trafficInc = [\n')
    url='http://dev.virtualearth.net/REST/v1/Traffic/Incidents/32.8007,-118.243683,34.8233,-117.6462?key=AjvzGWtIXBSVdyDnhYaa7BeqI69-XjgmSenOK4J44U7j_ckKQsb8OCA4EwH31Otr'
    updates=requests.get(url,verify=False).json()
    updates = updates['resourceSets'][0]['resources']
    
    for i in range(0,len(updates)):
	datai = {}
	datai['lat'] = updates[i]['point']['coordinates'][0]
	datai['lng'] = updates[i]['point']['coordinates'][1]
	datai['description'] = updates[i]['description']
        json.dump(datai, outfile)
        outfile.write(',\n')
    outfile.write(']\n\n')

    #####################crime###########################
    #Establish update time
    t = datetime.datetime.now() - datetime.timedelta(days = 7)
    u = datetime.datetime.now() - datetime.timedelta(days = 7) + datetime.timedelta(minutes = 60)
    earliest_createddate = t.strftime('%Y-%m-%dT%H:%M:%S.000')
    latest_createddate = u.strftime('%Y-%m-%dT%H:%M:%S.000')
    print 'crime'
    #Get data from SODA API
    #url ='https://data.lacounty.gov/resource/uvdj-ch3p.json?$order=crime_date ASC&$where=crime_date > "'+str(earliest_createddate)+'" AND crime_date < "'+str(latest_createddate)+'"'
    url ='https://data.lacounty.gov/resource/uvdj-ch3p.json?$order=crime_date ASC&$where=crime_date > "'+'2017-09-08T18:00:00.00'+'" AND crime_date < "'+'2017-09-09T00:00:00.00'+'"'


    updates=requests.get(url,verify=False).json()

    crime_data = []
    outfile.write('var crime = [\n')
    for i in updates:
	datai = {}
	datai['crime_category_description'] = i['crime_category_description']
	datai['date_time'] = i['crime_date']

	#2017-09-04T14:09:00.000
	datai['time'] = i['crime_date'][11:16]
	datai['station_name'] = i['station_name']
	if 'geo_location' in i:
	    if 'coordinates' in i['geo_location']:
		datai['lat'] = i['geo_location']['coordinates'][1]
		datai['lng'] = i['geo_location']['coordinates'][0]
	        crime_data.append(datai)
	elif 'station_name'in i:
	    if i['station_name'] in station_locs:
	        print i['station_name']
	        try:
		    datai['lat'] = station_locs[i['station_name']]['lat']
		    datai['lng'] = station_locs[i['station_name']]['lng']
		    crime_data.append(datai)
	        except Exception as e:
		    print "Publisher exception: " + str(e)
	if 'lat' in datai:
	    json.dump(datai,outfile)
	    outfile.write(',\n')
    outfile.write(']\n\n')

    #########################service requests#################################
    #Establish update time
    t = datetime.datetime.now() - datetime.timedelta(days = 7)
    u = datetime.datetime.now() - datetime.timedelta(days = 7) + datetime.timedelta(hours = 1)
    earliest_createddate = t.strftime('%Y-%m-%dT%H:%M:%S.000')
    latest_createddate = u.strftime('%Y-%m-%dT%H:%M:%S.000')
    print earliest_createddate
    print latest_createddate

    #Get data from SODA API
    #url ='https://data.lacity.org/resource/d4vt-q4t5.json?$order=createddate ASC&$where=createddate > "'  +  earliest_createddate  + '" AND createddate < "'+latest_createddate+'"'
    url ='https://data.lacity.org/resource/d4vt-q4t5.json?$order=createddate ASC&$where=createddate > "'+'2017-09-08T18:00:00.00'+'" AND createddate < "'+'2017-09-09T00:00:00.00'+'"'

    updates=requests.get(url,verify=False).json()

    serv_req_data = []
    outfile.write('var serviceRequests = [\n')
    for i in updates:
	r = i['requesttype']
	if r=='Bulky Items' or r=='Dead Animal Pickup' or r=='Electronic Waste' or r=='Graffiti Removal' or r=='Homeless Encampment' or r=='Illegal Dumping Pickup' or r=='Metal/Household Appliances' or r=='Multiple Streetlight Issue' or r=='Report Water Waste' or r=='Single Streetlight Issue':
	    datai = {}
	    datai['requesttype'] = i['requesttype']
	    if 'policeprecinct'in i:
	        datai['policeprecinct'] = i['policeprecinct']
	    if 'actiontaken'in i:
	        datai['actiontaken'] = i['actiontaken']
	    if 'createddate'in i:
	        datai['date_time'] = i['createddate']
		datai['time'] = i['createddate'][11:16]
	    if 'location'in i:
   	        datai['lng'] = i['location']['longitude']
	        datai['lat'] = i['location']['latitude']
	        if 'address' in i:
		    datai['address'] = i['address']
	        serv_req_data.append(datai)
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
		    serv_req_data.append(datai)
	        except Exception as e:
		    print "Exception: " + str(e)
		    print i['requesttype'] + '   ' + add
	    if 'lat' in datai:
	        json.dump(datai,outfile)
	        outfile.write(',\n')
    outfile.write(']\n\n')
    outfile.close()
if __name__ == '__main__':
    make_arrays('arrays.js')


















import json
import time
import urllib
import requests






def create(page,outfile,function_name):
	json_object = json.loads(page)
	json_data = []
	for j in json_object:
		json_data.append(j)

	data = []
	for i in json_data:
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
	    		ad = i['address']
	    		add = ad.replace(' ','+')
	    		loc_url='http://maps.google.com/maps/api/geocode/json?address=' + add
	    		json_loc=requests.get(loc_url,verify=False).json()
			try:
				datai['lng'] = json_loc['results'][0]['geometry']['location']['lng']
				datai['lat'] = json_loc['results'][0]['geometry']['location']['lat']
				data.append(datai)
			except Exception as e:
				print "Exception" + str(e)

	#with open(arrayfile, 'w') as outfile:
	outfile.write('function ' + function_name + '(){\n')
	outfile.write('var arr = [\n')
	for d in data:
    		json.dump(d, outfile)
    		outfile.write(',\n')
		outfile.flush()
	outfile.write(']\nreturn arr;}\n\n')

        
if __name__ == '__main__':


	f = open('logs/graffiti.log', 'r')
	pages = f.readlines()
	for p in pages:
		p = p.strip()

	outfile = open('map_locs.js', 'w+')
	
	count = 0
	for i in pages:
		name = 'graffitiLocs' + str(count)
		create(i,outfile,name)
		count += 1





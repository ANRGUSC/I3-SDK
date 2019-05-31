import json
import time
import urllib
import requests



def create(filename,outfile,function_name):
	f = open(filename, 'r')

	lines = f.readlines()
	json_data = []
	for l in lines:
		json_data.append(json.loads(l.strip()))

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
	outfile = open('map_arrays.js', 'w+')
	create('homeless.log',outfile,'homeless_locs')
	create('graffiti.log',outfile,'graffiti_locs')
	create('dead_animal.log',outfile,'dead_animal_locs')
	create('illegal_dumping.log',outfile,'illegal_dumping_locs')
	create('electronic.log',outfile,'electronic_locs')
	create('bulky_items.log',outfile,'bulky_items_locs')
	create('metal.log',outfile,'metal_locs')
	create('water_waste.log',outfile,'water_waste_locs')
	create('s_streetlight.log',outfile,'s_streetlight_locs')
	create('m_streetlight.log',outfile,'m_streetlight_locs')

"""
test_sub.py is an example of a subscriber to a topic
"""
import json
import paho.mqtt.client as mqtt
import time


class Subscriber(object):

	def __init__(self, logname, topicname):
		self.topic = topicname
        	self.log = logname
	        self.log = open(self.log, 'w+')
		self.sub_client = mqtt.Client()

	def on_connect(self, client, userdata, flags, rc):
	    m = "Connected flags " + str(flags) + " Result code "\
	    + str(rc) + " Client_id  " + str(client)
	    print(m)

	def on_message(self, client, userdata, msg):
	    print "Message received  " + msg.payload

	    if not self.log is None:
		self.log.write(msg.payload + '\n')
		self.log.flush()

	def subscribe(self):
	    self.sub_client.connect('localhost', 1883, 60) #connect to broker
	    self.sub_client.on_connect = self.on_connect
	    self.sub_client.on_message = self.on_message
	    self.sub_client.subscribe(self.topic)
		
	    rc = 0
	    while rc == 0:
		rc = self.sub_client.loop()
		time.sleep(.2)


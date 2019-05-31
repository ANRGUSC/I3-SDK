# Creates and executes functions of a mqtt client
import paho.mqtt.client as mqtt
import time

class I3_Publisher(object):
	def __init__(self,account,password,server='neptune.usc.edu',port=3883):
		""" Create a client object and connect to broker
		"""
		self.account = account
		self.password = password
		self.server = server
		self.port = port
		self.client = mqtt.Client()
		self.connect_to_broker()


	def on_connect(self,client, userdata, flags, rc):
		"""print out result code when connecting with the broker
		Args:
		client: publisher
		userdata:
		flags:
		rc: result code
		Returns:
		"""
		m="Connected flags"+str(flags)+" result code "\
		+str(rc)+" client1_id "+str(client)
		print(m)

	def connect_to_broker(self, account=None, pw=None):
		""" Connects to broker.
		"""
		if not account is None:
			self.account = account
		if not pw is None:
			self.password = pw
		try:
			self.client.on_connect = self.on_connect
			self.client.username_pw_set(self.account,self.password)
			self.client.loop_start()
			time.sleep(1)
			self.client.connect(self.server,self.port)
			time.sleep(3) 
			    

		except Exception as e:
			print "Exception" + str(e)

	def publish_to_topic(self,topic,message):
	    self.client.publish(topic,message)
	    time.sleep(1)

	def disconnect(self):
		self.client.loop_stop()
		time.sleep(2)
		self.client.disconnect()








import paho.mqtt.client as mqtt
import time

class Client(object):
	def __init__(self,server,port,account=None,password=None,logfilename=None):
		self.account = account
		self.password = password
		self.server = server
		self.port = port
		self.logfile = None
		if not logfilename is None:
			self.logfile = open(logfilename, 'w+')
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

	def on_message(self,client, userdata, msg):
		print "Message received:  " + msg.payload
		if not self.logfile is None:
			self.logfile.write(msg.payload)
			self.logfile.flush()

	def connect_to_broker(self):
		#Connect to broker
		try:
			self.client.on_connect = self.on_connect
			self.client.on_message = self.on_message
			self.client.username_pw_set(self.account,self.password)
			self.client.connect(self.server,self.port)      

		except Exception as e:
			print "Exception" + str(e)

	def publish_to_topic(self,topic,message):
	    self.client.publish(topic,message)
	    time.sleep(2)

	def subscribe_to_topic(self,topic):
		self.client.subscribe(topic)
	
	def run_sub(self):
		rc = 0
		while rc == 0:
			rc = self.client.loop()
			time.sleep(1)

	def disconnect(self):
		self.client.disconnect()








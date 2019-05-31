"""
test_pub.py is an example of a publisher sending LA related data from twitter to the broker
"""

import paho.mqtt.client as mqtt
import time
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import json



ckey='ksOitSSd4Ysp96fij6cTVvqws'
csecret='Qul0iNK1FcndJxZz4CkXoyInXLQUZib4sp6s0QboZUdUwXk6IK'
atoken='875956994586271744-Bq69gepcQOhYZvx88KBXKzhehxt2oeI'
asecret='j7TmhSA366IcAVGaat0FDrnC2yqU8DjWPhujO4k2omXTq'



class Listener(StreamListener):
	def on_data(self,data):
		#pub_client.publish(topic[0],data)

		count = 0
   		while count < 100:
       			 count += 1
       			 pub_client.publish(topic[0],data)
			 print data
        		 time.sleep(2)
		return 0
		
	def on_error(self,error):
		print status




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

    

    account = 'seller'
    topic = ['twitter_la_data']
    pw = 'zdacm8'

    try:
	
        pub_client = mqtt.Client(account)
        pub_client.on_connect = on_connect
        pub_client.on_message = on_message
        pub_client.username_pw_set(account, pw)
        pub_client.connect('neptune.usc.edu', 1883)  
	auth=OAuthHandler(ckey,csecret)
	auth.set_access_token(atoken,asecret)
	twitterStream=Stream(auth,Listener())
	twitterStream.filter(track=["LA"])    #connect to broker
    	
    except Exception as e:
        print "Exception" + str(e)

   
    
    pub_client.disconnect()


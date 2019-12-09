For version v1 :

For creating an account, product and even buying a product please follow the documentation at http://18.219.4.146:8000/media/I3_v1_user_guide.pdf

Please modify the following script files to point at the I3 running instance along with the credentials.

pub.py - this is a publisher script written in python
sub.py - this is a subscriber script written in python
The scripts writes into a configurable log file.

To test them you would need the folowing :

An I3 running instance
For pub :
account refers to full device name under the hubs section of the topic 
pw referes to password added while creating device (API_key and asymmetric public key)
host refers to MQTT broker
For sub :
account refers to username on i3 Marketplace of the subscriber
pw referes to password obtained in the notification tray
host refers to MQTT broker

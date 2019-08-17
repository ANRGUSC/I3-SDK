"""
test_sub.py is an example of a publisher subscribing to a topic
The script requires the user to have the following
1. i3 running instance
2. User name
3. System generated password - The first time a user creates a product a system generates password would be available
4. The topic to which data is published
5. The CA certificate is required

This script is used to publish data over TLS which means transport layer security is enabled.
Note : TLS insecure server is set to true
"""

import paho.mqtt.client as mqtt
import time


def on_connect(client, userdata, flags, rc):
    """print out result code when connecting with the broker

    Args:
        client: publisher
        userdata:
        flags:
        rc: result code

    Returns:

    """

    m = "Connected flags" + str(flags) + "result code " \
        + str(rc) + "client1_id  " + str(client)
    print(m)


def on_message(client1, userdata, message):
    """print out recieved message

    Args:
        client1: publisher
        userdata:
        message: recieved data

    Returns:

    """
    print("message received  ", str(message.payload.decode("utf-8")))


if __name__ == '__main__':

    #TODO: modify account / username
    #TODO: modify topic
    #TODO: modify system generated password

    account = 'kk'
    topic = ['test']
    pw = '3s2f6d'

    try:
        pub_client = mqtt.Client(account)
        pub_client.on_connect = on_connect
        pub_client.on_message = on_message
        pub_client.tls_set("ca.crt", tls_version=2)
        pub_client.tls_insecure_set(True)
        pub_client.username_pw_set(account, pw)
        pub_client.connect('18.219.4.146', 8883)  # connect to broker

    except Exception as e:
        print "Exception" + str(e)

    # pub_client.subscribe(topic)
    # pub_client.loop_start()

    count = 0
    while count < 2:
        count += 1
        pub_client.publish(topic[0], 'Hello World')
        # pub_client.publish(topic[1], 'Hello World')
        time.sleep(2)

    pub_client.disconnect()
/*******************************************************************************
 * Copyright (c) 2012, 2017 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution. 
 *
 * The Eclipse Public License is available at 
 *   http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at 
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Ian Craggs - initial contribution
 *******************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "MQTTClient.h"

/**
 * below is the format to be used when publishing to an I3 product (topic)
#define ADDRESS     "broker_address:1883"
#define ACCOUNT     "my_account_name"
#define CLIENTID    "my_account_name$my_hub_name$my_device_name"
#define TOPIC       "my_account_name/my_hub_name/my_product_name"
#define PASSWORD    "my_account_password"
*/
#define ADDRESS     "18.219.4.146:1883"
#define CLIENTID    "SpencerMcD$testCSDK$testC1"
#define TOPIC       "SpencerMcD/testCSDK/testProd1"
#define ACCOUNT     "SpencerMcD"
#define PASSWORD    "1234567"
#define PAYLOAD     "Hello World!"
#define QOS         1
#define TIMEOUT     10000L

/**
 * Control block for I3 mqtt client. 
 * 
 * Includes default values with paho initializers. 
 */

struct i3_client_block
{
    MQTTClient client;
    MQTTClient_connectOptions conn_opts;
    MQTTClient_message pubmsg;
    MQTTClient_deliveryToken token;
} const ref_i3_client = {  (MQTTClient)NULL,
                                MQTTClient_connectOptions_initializer,
                                MQTTClient_message_initializer,
                                (MQTTClient_deliveryToken)NULL
                            };
typedef struct i3_client_block i3_client_handle;

/**
 * @brief initializes #i3_client_block and calls MQTTClient_create()
 * 
 * @param _i3_client            #i3_client_handle client block object
 * @param endpoint_address      <tt>const char* const</tt> "broker_address:1883"
 * @param client_id             <tt>const char* const</tt> "my_account_name$my_hub_name$my_device_name"
 * @param account               <tt>const char* const</tt> "my_account_name"
 * @param password              <tt>const char* const</tt> "my_account_password"
 * 
 * @retval  0                   on success
 * @retval  -1                  on failure
 */
int i3_client_create(i3_client_handle* _i3_client, const char* const endpoint_address, const char* const client_id,
                    const char* const account, const char* const password)
{   
    // create client
    // note: we will be creating the client with the ACCOUNT name (opposite of subscribe)
    MQTTClient_create(&_i3_client->client, endpoint_address, account,
        MQTTCLIENT_PERSISTENCE_NONE, NULL);

    // populate conn_opts
    _i3_client->conn_opts.keepAliveInterval = 20;
    _i3_client->conn_opts.cleansession = 1;
    // note: we will be setting the username to CLIENTID (opposite of subscribe)
    _i3_client->conn_opts.username = client_id;
    _i3_client->conn_opts.password = password;

    return 0;
}

int main(int argc, char* argv[])
{
    int rc;
    
    // create client
    i3_client_handle my_i3_client = ref_i3_client;

    if ((rc = i3_client_create(&my_i3_client, ADDRESS, CLIENTID, ACCOUNT, PASSWORD)) != 0)
    {
        printf("Failed to create I3 client, return code %d\n", rc);
        exit(EXIT_FAILURE);
    }

    if ((rc = MQTTClient_connect(my_i3_client.client, &my_i3_client.conn_opts)) != MQTTCLIENT_SUCCESS)
    {
        printf("Failed to connect, return code %d\n", rc);
        exit(EXIT_FAILURE);
    }

    my_i3_client.pubmsg.payload = PAYLOAD;
    my_i3_client.pubmsg.payloadlen = (int)strlen(PAYLOAD);
    my_i3_client.pubmsg.qos = QOS;
    my_i3_client.pubmsg.retained = 0;

    MQTTClient_publishMessage(my_i3_client.client, TOPIC, &my_i3_client.pubmsg, &my_i3_client.token);
    printf("Waiting for up to %d seconds for publication of %s\n"
            "on topic %s for client with ClientID: %s\n",
            (int)(TIMEOUT/1000), PAYLOAD, TOPIC, CLIENTID);
    rc = MQTTClient_waitForCompletion(my_i3_client.client, my_i3_client.token, TIMEOUT);
    printf("Message with delivery token %d delivered\n", my_i3_client.token);
    MQTTClient_disconnect(my_i3_client.client, 10000);
    MQTTClient_destroy(&my_i3_client.client);

    return rc;
}
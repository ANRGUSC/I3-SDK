// generic includes
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// dependency includes
#include "MQTTClient.h"
#include "limits.h"

// project includes
#include "i3_client.h"

I3_RESULT i3_print_message(const char* msg)
{
    I3_RESULT result;

    // validate argument
    if(msg == NULL)
    {
        result = I3_RESULT_INVALID_ARGUMENT_ERROR;
    }
    // print message
    else
    {
        if(printf("%s\n", msg) < 0)
        {
            result = I3_RESULT_INVALID_ARGUMENT_ERROR;
        }
        else
        {
            result = I3_RESULT_SUCCESS;
        }
    }
    
    return result;
}

int i3_client_create(i3_client_handle* _i3_client, const char* const endpoint_address, const char* const client_id,
                    const char* const account, const char* const password, int keep_alive_interval, int clean_session)
{   
    int result = RESULT_INIT;
    // create client
    // note: we will be creating the client with the ACCOUNT name (opposite of subscribe)
    if((result = MQTTClient_create(&_i3_client->client, endpoint_address, account,
        MQTTCLIENT_PERSISTENCE_NONE, NULL)) == 0)
    {
        // populate conn_opts
        _i3_client->conn_opts.keepAliveInterval = keep_alive_interval;
        _i3_client->conn_opts.cleansession = clean_session;
        // note: we will be setting the username to CLIENTID (opposite of subscribe)
        _i3_client->conn_opts.username = client_id;
        _i3_client->conn_opts.password = password;
    }

    return result;
}

int i3_connect(i3_client_handle* _i3_client)
{
    return MQTTClient_connect(_i3_client->client, &_i3_client->conn_opts);
}

int i3_publish(i3_client_handle* _i3_client, const char* const topic, void* payload, int qos, 
                unsigned long timeout, int retain)
{
    int result = RESULT_INIT;

    _i3_client->pubmsg.payload = payload;
    _i3_client->pubmsg.payloadlen = (int)sizeof(payload);
    _i3_client->pubmsg.qos = qos;
    _i3_client->pubmsg.retained = retain;

    if((result = MQTTClient_publishMessage(_i3_client->client, topic, &_i3_client->pubmsg, &_i3_client->token)) == MQTTCLIENT_SUCCESS)
    {
        printf("Waiting for up to %d seconds for publication of %s\n"
            "on topic %s for client with ClientID: %s\n",
            (int)(timeout/1000), (char*)payload, topic, _i3_client->conn_opts.username);
        if((result = MQTTClient_waitForCompletion(_i3_client->client, _i3_client->token, timeout)) == MQTTCLIENT_SUCCESS)
        {   
            printf("Message with delivery token %d delivered\n", _i3_client->token);
        }
        else
        {
            printf("Message not delivered\n");
        }
    }
    else
    {
        printf("Issue with MQTTClient_publishMessage()\n");        
    }

    return result;
}

int i3_disconnect(i3_client_handle* _i3_client, int timeout)
{
    return MQTTClient_disconnect(_i3_client->client, timeout);
}

void i3_client_destroy(i3_client_handle* _i3_client)
{
    MQTTClient_destroy(&_i3_client->client);
}
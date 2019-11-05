// generic includes
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// dependency includes
#include "MQTTClient.h"
#include "limits.h"

// project includes
#include "i3_client.h"
#include "i3_config.h"

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
                    const char* const account, const char* const password, const char* const client_type)
{   
    int result = RESULT_INIT;
    // create client
    // note: we will be creating the client with the ACCOUNT name (opposite of subscribe)
    if(strncmp(client_type, I3_CLIENT_TYPE_PUBLISHER, sizeof(I3_CLIENT_TYPE_PUBLISHER)) == 0)
    {
        if((result = MQTTClient_create(&_i3_client->client, endpoint_address, account,
            MQTTCLIENT_PERSISTENCE_NONE, NULL)) == 0)
        {
            // populate conn_opts
            _i3_client->conn_opts.keepAliveInterval = I3_MQTT_KEEP_ALIVE_INTERVAL;
            _i3_client->conn_opts.cleansession = I3_MQTT_CLEAN_SESSION;
            // note: we will be setting the username to CLIENTID (opposite of subscribe)
            _i3_client->conn_opts.username = client_id;
            _i3_client->conn_opts.password = password;
        }
    }
    else if(strncmp(client_type, I3_CLIENT_TYPE_SUBSCRIBER, sizeof(I3_CLIENT_TYPE_SUBSCRIBER)) == 0)
    {
        if((result = MQTTClient_create(&_i3_client->client, endpoint_address, client_id,
            MQTTCLIENT_PERSISTENCE_NONE, NULL)) == 0)
        {
            // populate conn_opts
            _i3_client->conn_opts.keepAliveInterval = I3_MQTT_KEEP_ALIVE_INTERVAL;
            _i3_client->conn_opts.cleansession = I3_MQTT_CLEAN_SESSION;
            // note: we will be setting the username to CLIENTID (opposite of subscribe)
            _i3_client->conn_opts.username = account;
            _i3_client->conn_opts.password = password;
        }
    }
    
    return result;
}

// int i3_set_options()gtr
int i3_connect(i3_client_handle* _i3_client)
{
    return MQTTClient_connect(_i3_client->client, &_i3_client->conn_opts);
}

int i3_set_callbacks(i3_client_handle* _i3_client, void* context, void* connection_lost,
                    void* message_arrived, void* message_delivered)
{
    return MQTTClient_setCallbacks(_i3_client->client, context, connection_lost, message_arrived, 
                    message_delivered);
}

int i3_publish(i3_client_handle* _i3_client, const char* const topic, void* payload, size_t payload_length)
{
    int result = RESULT_INIT;
    _i3_client->pubmsg.payload = payload;
    _i3_client->pubmsg.payloadlen = payload_length;
    _i3_client->pubmsg.qos = I3_MQTT_QUALITY_OF_SERVICE;
    _i3_client->pubmsg.retained = I3_MQTT_RETAIN;

    if((result = MQTTClient_publishMessage(_i3_client->client, topic, &_i3_client->pubmsg, &_i3_client->token)) == MQTTCLIENT_SUCCESS)
    {
        printf("Waiting for up to %d seconds for publication of %s\n"
            "on topic %s for client with ClientID: %s\n",
            (int)(I3_MQTT_TIMEOUT/1000), (char*)payload, topic, _i3_client->conn_opts.username);
        if((result = MQTTClient_waitForCompletion(_i3_client->client, _i3_client->token, I3_MQTT_TIMEOUT)) == MQTTCLIENT_SUCCESS)
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

int i3_subscribe(i3_client_handle* _i3_client, const char* const topic)
{
    return MQTTClient_subscribe(_i3_client->client, topic, I3_MQTT_QUALITY_OF_SERVICE);
}

int i3_unsubscribe(i3_client_handle* _i3_client, const char* const topic)
{
    return MQTTClient_unsubscribe(_i3_client->client, topic);
}

int i3_disconnect(i3_client_handle* _i3_client, int timeout)
{
    return MQTTClient_disconnect(_i3_client->client, timeout);
}

void i3_client_destroy(i3_client_handle* _i3_client)
{
    MQTTClient_destroy(&_i3_client->client);
}

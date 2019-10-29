// generic includes
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// dependency includes
#include "MQTTClient.h"
#include "limits.h"

// project includes
#include "i3_client.h"

/**
 * below is the format to be used when subscribing to an I3 product (topic)
#define ADDRESS     "broker_address:1883"
#define ACCOUNT     "my_account_name"
#define CLIENTID    "my_account_name$my_hub_name$my_device_name"
#define TOPIC       "topic_owner_account_name/topic_owner_hub_name/product_name"
#define PASSWORD    "generated_api_key" (find in notifications after subscribing to topic)
*/
#define ADDRESS     "18.219.4.146:1883"
#define CLIENT_TYPE "subscriber"
#define CLIENTID    "shmcdono$testCSub$testCSubClient"
#define TOPIC       "SpencerMcD/testCSDK/testProd1"
#define ACCOUNT     "shmcdono"
#define PASSWORD    "7k0m4e3qt6kl"
#define QOS         1
#define TIMEOUT     10000L

volatile MQTTClient_deliveryToken deliveredtoken;

void delivered(void *context, MQTTClient_deliveryToken dt)
{
    printf("Message with token value %d delivery confirmed\n", dt);
    deliveredtoken = dt;
}

int msgarrvd(void *context, char *topicName, int topicLen, MQTTClient_message *message)
{
    int i;
    char* payloadptr;

    printf("Message arrived\n");
    printf("     topic: %s\n", topicName);
    printf("   message: ");

    payloadptr = message->payload;
    for(i=0; i<message->payloadlen; i++)
    {
        putchar(*payloadptr++);
    }
    putchar('\n');
    MQTTClient_freeMessage(&message);
    MQTTClient_free(topicName);
    return 1;
}

void connlost(void *context, char *cause)
{
    printf("\nConnection lost\n");
    printf("     cause: %s\n", cause);
}

int main(int argc, char* argv[])
{
    int ch;
    int result;
    
    // create client
    i3_client_handle my_i3_client = {  
                                    (MQTTClient)NULL,
                                    MQTTClient_connectOptions_initializer,
                                    MQTTClient_message_initializer,
                                    (MQTTClient_deliveryToken)0
                                    };

    if ((result = i3_client_create(&my_i3_client, ADDRESS, CLIENTID, ACCOUNT, PASSWORD, 20, 1, CLIENT_TYPE)) != 0)
    {
        printf("Failed to create I3 client, return code %d\n", result);
        exit(EXIT_FAILURE);
    }

    MQTTClient_setCallbacks(my_i3_client.client, NULL, connlost, msgarrvd, delivered);

    if ((result = i3_connect(&my_i3_client)) != 0)
    {
        printf("Failed to connect, return code %d\n", result);
        exit(EXIT_FAILURE);
    }

    printf("Subscribing to topic %s\nfor client %s using QoS%d\n\n"
           "Press Q<Enter> to quit\n\n", TOPIC, CLIENTID, QOS);
    MQTTClient_subscribe(my_i3_client.client, TOPIC, QOS);

    do 
    {
        ch = getchar();
    } while(ch!='Q' && ch != 'q');

    MQTTClient_unsubscribe(my_i3_client.client, TOPIC);

    if ((result = i3_disconnect(&my_i3_client, (int)TIMEOUT)) != 0)
    {
        printf("Failed to disconnect, return code %d\n", result);
        exit(EXIT_FAILURE);
    }
    
    if(&my_i3_client != NULL)
    {
        i3_client_destroy(&my_i3_client);
    }
}

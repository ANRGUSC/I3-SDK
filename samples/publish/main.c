// generic includes
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// dependency includes
#include "MQTTClient.h"
#include "limits.h"

// project includes
#include "i3_client.h"
#include "i3_config.h"

/**
 * below is the format to be used when publishing to an I3 product (topic)
#define ADDRESS     "broker_address:1883"
#define ACCOUNT     "my_account_name"
#define CLIENTID    "my_account_name$my_hub_name$my_device_name"
#define TOPIC       "my_account_name/my_hub_name/my_product_name"
#define PASSWORD    "my_account_password"
*/
#define ADDRESS     "18.219.4.146:1883"
#define CLIENT_TYPE "publisher"
#define CLIENTID    "SpencerMcD$testCSDK$testC1"
#define TOPIC       "SpencerMcD/testCSDK/testProd1"
#define ACCOUNT     "SpencerMcD"
#define PASSWORD    "1234567"
#define PAYLOAD     "0123456789"
#define QOS         1
#define TIMEOUT     10000L

int main(int argc, char* argv[])
{
    int result;
    
    // create client
    i3_client_handle my_i3_client = {  
                                    (MQTTClient)NULL,
                                    MQTTClient_connectOptions_initializer,
                                    MQTTClient_message_initializer,
                                    (MQTTClient_deliveryToken)0
                                    };

    if ((result = i3_client_create(&my_i3_client, ADDRESS, CLIENTID, ACCOUNT, PASSWORD, CLIENT_TYPE)) != 0)
    {
        printf("Failed to create I3 client, return code %d\n", result);
        exit(EXIT_FAILURE);
    }
    else if ((result = i3_connect(&my_i3_client)) != 0)
    {
        printf("Failed to connect, return code %d\n", result);
        exit(EXIT_FAILURE);
    }
    else if((result = i3_publish(&my_i3_client, TOPIC, PAYLOAD, (int)strlen(PAYLOAD))) != 0)
    {
        printf("Failed to publish, return code %d\n", result);
        exit(EXIT_FAILURE);
    }
    else if ((result = i3_disconnect(&my_i3_client, (int)TIMEOUT)) != 0)
    {
        printf("Failed to disconnect, return code %d\n", result);
        exit(EXIT_FAILURE);
    }
    
    if(&my_i3_client != NULL)
    {
        i3_client_destroy(&my_i3_client);
    }

    return result;
}

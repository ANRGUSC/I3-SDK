#ifndef I3_CLIENT_H
#define I3_CLIENT_H
#endif

// generic includes
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// dependency includes
#include "MQTTClient.h"
#include "limits.h"

// project includes

#define RESULT_INIT INT_MIN

// enumerated result values (for error handling)
#define I3_RESULT_ERROR_FLAG    0x80 
typedef enum I3_RESULT
{
    I3_RESULT_SUCCESS                      = 0,
    
    I3_RESULT_USER_CONFIG_ERROR            = I3_RESULT_ERROR_FLAG | 0x01,
    I3_RESULT_MEMORY_ERROR                 = I3_RESULT_ERROR_FLAG | 0x02,
    I3_RESULT_IO_ERROR                     = I3_RESULT_ERROR_FLAG | 0x03,
    I3_RESULT_INVALID_ARGUMENT_ERROR       = I3_RESULT_ERROR_FLAG | 0x04,
    I3_RESULT_CONNECT_ERROR                = I3_RESULT_ERROR_FLAG | 0x05,
    I3_RESULT_PUBLISH_ERROR                = I3_RESULT_ERROR_FLAG | 0x06,
    I3_RESULT_SUBSCRIBE_ERROR              = I3_RESULT_ERROR_FLAG | 0x07,
} I3_RESULT;

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
};
typedef struct i3_client_block i3_client_handle;

// *************************************** I3-SDK APIs ***************************************
int i3_client_create(i3_client_handle* _i3_client, const char* const endpoint_address, const char* const client_id,
                    const char* const account, const char* const password, int keep_alive_interval, int clean_session);

/**
 * @brief calls MQTTClient_connect()
 * 
 * @param _i3_client            #i3_client_handle
 * 
 * @retval  0                   on success
 * @retval  -1                  on failure
 */
int i3_connect(i3_client_handle* _i3_client);

/**
 * @brief publishes message to I3 topic
 * 
 * @param _i3_client            #i3_client_handle
 * @param payload               <tt>void*</tt> payload to publish
 * @param topic                 <tt>const char* const</tt> the topic to be published on
 * @param qos                   <tt>int</tt> quality of service selector
 *                                  0: Fire and forget
 *                                  1: At least once - the message will be delivered, but may be
 *                                      delivered more than once in some circumstances
 *                                  2: Once and ony once
 * @param timeout               <tt>unsigned long</tt> the time to wait for publish ack in ms
 * @param retain                <tt>int</tt> 1 to keep message after publish, 0 to clear message 
 * 
 * @retval  0                   on success
 * @retval  -1                  on failure
 */
int i3_publish(i3_client_handle* _i3_client, const char* const topic, void* payload, int qos, 
                unsigned long timeout, int retain);

/**
 * @brief calls MQTTClient_disconnect()
 * 
 * @param _i3_client            #i3_client_handle
 * @param timeout               <tt>int</tt> time to wait for disconnect ack in ms
 * 
 * @retval  0                   on success
 * @retval  -1                  on failure
 */
int i3_disconnect(i3_client_handle* _i3_client, int timeout);

/**
 * @brief calls MQTTClient_destroy())
 * 
 * @param _i3_client            #i3_client_handle
 */
void i3_client_destroy(i3_client_handle* _i3_client);

#undef I3_CLIENT_H

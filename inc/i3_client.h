#ifndef I3_CLIENT_H
#define I3_CLIENT_H
#endif

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

// typedef struct I3_CLIENT_TAG
// {
//     const char* client_id,
//     const char* username,
//     const char* password,
//     MQTT_PAHO_CLIENT_HANDLE mqtt_paho_client_hande, 
// } I3_CLIENT_HANDLE;

// *************************************** I3-SDK APIs ***************************************
I3_RESULT i3_print_message(const char* msg);

/**
* @brief    client connection control block create function (constructor)
* @param    I3_CLIENT_HANDLE i3_client_handle 
* ...
* @return   I3_RESULT enumerated result for error handling
*   @retval I3_SUCCESS on successful client creation and callback registry
*   ...
*/
// I3_RESULT i3_client_create(I3_CLIENT_HANDLE i3_client_handle, const char* const client_id, 
//             const char* const username, const char* const password, void* connect_callback);

#undef I3_CLIENT_H

# Proposal Implement and Test I3-SDK-C

## SDK Layout
### Hierarchy
..
./config
./inc
./samples
./src
./tests
    ./tests/unittests
CMakeLists.txt


CMakeLists.txt:
Will allow user to build with/without samples and tests.

## SDK Behavior
**APIs**
- all functions return `typedef enum` result value (e.g. `I3_RESULT`)
```C
//assuming 2 byte hex value for all enum values
#define I3_RESULT_ERROR_FLAG    0x80 
typedef enum I3_RESULT
{
    I3_SUCCESS                      = 0,
    
    I3_USER_CONFIG_ERROR            = I3_RESULT_ERROR_FLAG | 0x01,
    I3_CONNECT_ERROR                = I3_RESULT_ERROR_FLAG | 0x02,
    I3_PUBLISH_ERROR                = I3_RESULT_ERROR_FLAG | 0x03,
    I3_SUBSCRIBE_ERROR              = I3_RESULT_ERROR_FLAG | 0x04,
};
```

- client connection control block
```C
typedef struct I3_CLIENT_TAG
{
    const char* client_id,
    const char* username,
    const char* password,
    MQTT_PAHO_CLIENT_HANDLE mqtt_paho_client_hande, 
} I3_CLIENT_HANDLE;
```

- client connection control block create function (constructor)
```C
/**
* @brief    client connection control block create function (constructor)
* @param    I3_CLIENT_HANDLE i3_client_handle 
* ...
* @return   I3_RESULT enumerated result for error handling
*   @retval I3_SUCCESS on successful client creation and callback registry
*   ...
*/
I3_RESULT i3_client_create(I3_CLIENT_HANDLE i3_client_handle, const char* const client_id, const char* const                username, const char* const password, void* connect_callback);
```

- client connection control block destroy function (destructor)
```C
I3_RESULT i3_client_destroy(I3_CLIENT_HANDLE i3_client_handle);
```

- function to establish mqtt connection with i3
```C
I3_RESULT i3_client_connect(I3_CLIENT_HANDLE i3_client_handle);
```

- function to publish data to topic
```C
I3_RESULT i3_client_publish(I3_CLIENT_HANDLE i3_client_handle, const char* topic, const uint8_t* data,
            void* message);
```

- function to subscribe to topic
```C
I3_RESULT i3_client_subscribe(I3_CLIENT_HANDLE i3_client_handle, const char* topic, 
            void* message_receive_callback);
```

## Coding Conventions
- maintain "i3_" namespace for all public variables and functions
- maintain "I3_" namespace for all macros
- only return I3_RESULT for every function
- destroy functions can return void if no memory is freed
 
## Implementation Steps
1) build simple pub/sub samples
    - showcase how to use APIs
    - Include callbacks/logs to confirm connection and successful publish/subscribe
2) build pub/sub unit tests
    - 
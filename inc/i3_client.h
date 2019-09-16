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

// *************************************** I3-SDK APIs ***************************************
I3_RESULT i3_print_message(const char* msg);

#undef I3_CLIENT_H

// generic includes
#include <stdlib.h>
#include <stdio.h>

// dependency includes

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

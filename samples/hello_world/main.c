// generic includes
#include <stdio.h>

// dependency includes

// project includes
#include "i3_client.h"

#define THIS_SAMPLE_NAME "hello_world"
#define HELLO_WORLD "Hello World!"

void main()
{
    I3_RESULT result;
    if ((result = i3_print_message(HELLO_WORLD)) != 0)
    {
        (void)printf("ERROR[%d]: error printing message\n", (int)result);
    }
}
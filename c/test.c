
#include <stdio.h>

typedef struct DVM_Token
{
    char type;
    union {
        double asNumber;
    } value;
} DVM_Token;

typedef struct DVM_Stream
{
    const char *current;
    const char *end;
} DVM_Stream;



int main()
{
    DVM_Token t;
    t.value.asNumber;
}
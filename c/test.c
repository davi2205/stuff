
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static size_t alignSize(size_t size, size_t alignment)
{
    size_t a = size % alignment;
    return a == 0 ? size : size + (alignment - a);
}

typedef struct DVM_BufferMeta
{
    size_t refCount;
} DVM_BufferMeta;

typedef struct DVM_String
{
    size_t length;
    char *buffer;
} DVM_String;

static void DVM_StringInit(const char *cStr, DVM_String *str)
{
    size_t len = strlen(cStr) + 1;
    size_t metaOffset = alignSize(len, sizeof(DVM_BufferMeta));

    str->length = len;
    str->buffer = malloc(metaOffset + sizeof(DVM_BufferMeta));

    memcpy(str->buffer, cStr, len);

    DVM_BufferMeta *meta = (DVM_BufferMeta *)(str->buffer + metaOffset);
    meta->refCount = 0;
}

static void DVM_StringDispose(DVM_String *str)
{
    size_t metaOffset = alignSize(str->length, sizeof(DVM_BufferMeta));
    DVM_BufferMeta *meta = (DVM_BufferMeta *)(str->buffer + metaOffset);

    if (meta->refCount > 0)
    {
        meta->refCount--;
        return;
    }

    free(str->buffer);

    str->length = 0;
    str->buffer = NULL;
}

typedef struct DVM_Value
{
    char type;
    union {
        DVM_String asString;
    };
} DVM_Value;

int main()
{
    DVM_String str;
    DVM_StringInit("hell world", &str);

    

    printf("%s\n", (const char *)str.buffer);
    printf("%li\n", sizeof(DVM_Value));

    DVM_StringDispose(&str);
}
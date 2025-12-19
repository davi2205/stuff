#ifndef ARRAY_HPP_INCLUDED
#define ARRAY_HPP_INCLUDED

#include <stdlib.h>

template <typename T>
class Array {

public:
    bool Alloc( int count );
    bool Realloc( int count );
    void Free();

    int Count() const;

    T &operator[]( int index );
    const T &operator[]( int index ) const;

private:
    int count;
    T *data;

};

template <typename T>
bool Array<T>::Alloc( int count ) {

    if ( count < 0 ) return false;
    
    if ( count == 0 ) {

        data = NULL;
        this->count = 0;
        return true;

    }

    data = (T*) calloc( count, sizeof( T ) );
    this->count = count;
    return data != NULL;

}

template <typename T>
bool Array<T>::Realloc( int count ) {

    if ( count < 0 ) return false;

    T *newData;

    newData = (T*) realloc( data, count * sizeof( T ) );

    if ( newData == NULL ) return false;

    data = newData;
    this->count = count;
    
    return true;

}

template <typename T>
void Array<T>::Free() {

    if ( data != NULL ) {

        free( data );
        data = NULL;

    }

    count = 0;

}

template <typename T>
int Array<T>::Count() const {

    return count;

}

template <typename T>
T &Array<T>::operator[]( int index ) {

    return data[index];

}

template <typename T>
const T &Array<T>::operator[]( int index ) const {

    return data[index];

}

#endif // ARRAY_HPP_INCLUDED

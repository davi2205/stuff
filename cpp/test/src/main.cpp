
#include <iostream>

#include "array.hpp"
#include "string.hpp"

struct Test {

    int a;
    float b;

};

int main(int argc, char *argv[]) {

    Array< Test > arr;
    String str, str2;
    int i;

    str.Set( str.Set( "Teste123" ) );

    if ( ! arr.Alloc( 5 ) ) return 1;

    for ( i = 0; i < arr.Count(); i++ ) {
        
        arr[ i ].a = i * 10;
        std::cout << "arr[" << i << "] = " << arr[ i ].a << std::endl;

    }

    arr.Free();

}

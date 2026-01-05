











class ServerObject {

    static async newInstanceOf( className, ...args ) {

        //

    }

}

var foo, ok;

foo = await ServerObject.newInstanceOf( 'Foo' );
ok = await foo.saveForm( { x: 300, y: 400 } );
 


class Tokenizer {

    tokenize( source ) {

        var i, ch, tokens, chars, pointCount;

        i = 0;
        ch = source.charAt( i );
        tokens = new Array;
        chars = new Array;
        pointCount = 0;

        for ( ;; ) {

            if ( ch === '' ) break;

            if ( ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r' ) {

                ch = source.charAt( ++i );
                continue;

            }

            if ( ch === '(' || ch === ')' || ch === '[' || ch === ']' || ch == '|' || ch === '.' || ch === ';' || ch === '^' ) {

                tokens.push( { type: ch, value: null } );
                ch = source.charAt( ++i );
                continue;

            }

            if ( ch >= '0' && ch <= '9' ) {

                chars.length = 0;
                pointCount = 0;

                do {

                    chars.push( ch );
                    ch = source.charAt( ++i );

                    if ( ch === '.' ) pointCount++;

                } while ( ch >= '0' && ch <= '9' && pointCount < 2 );

                tokens.push( { type: 'number', value: parseInt( chars.join( '' ), 10 ) } );
                continue;

            }

            if ( ch === "'" ) {

                chars.length = 0;
                ch = source.charAt( ++i );

                for ( ;; ) {

                    if ( ch === '' ) throw new Error( 'Unterminated string literal' );

                    if ( ch === "'" ) {

                        ch = source.charAt( ++i );
                        if ( ch !== "'" ) break;

                    }

                    chars.push( ch );
                    ch = source.charAt( ++i );

                } 

                tokens.push( { type: 'string', value: chars.join( '' ) } );
                continue;

            }

            if ( ch == ':' ) {

                chars.length = 0;

                do {

                    chars.push( ch );
                    ch = source.charAt( ++i );

                } while ( ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9' );

                tokens.push( { type: 'param', value: chars.join( '' ) } );
                continue;

            }

            if ( ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' ) {

                chars.length = 0;

                do {

                    chars.push( ch );
                    ch = source.charAt( ++i );

                } while ( ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9' );

                if ( ch === ':' ) {
 
                    ch = source.charAt( ++i );
                    tokens.push( { type: 'keyword', value: chars.join( '' ) + ':' } );
                    continue;

                }

                tokens.push( { type: 'name', value: chars.join( '' ) } );
                continue;

            }

            throw new Error( 'Unexpected character: ' + ch );

        }

        return tokens;

    }

}



var s = new Tokenizer;
console.log( s.tokenize( `

    from: aNumber to: anotherNumber do: aBlock

    | a b c |

    0 to: 10 do: [ :i | Transcript show: i; cr ].    

    0 to: 10 do: [ :i |
    
        Transcript show: i; cr.
        Transcript show: i; cr.
        Transcript show: [
        
            Transcript show: i; cr.
            Transcript show: i; cr.

        ].
        
    ].

` ) );
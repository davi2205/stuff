



class Tokenizer {

    tokenize(source) {

        var index, ch, tokens, chars, pointCount;

        index = 0;
        ch = source.charAt( index );
        tokens = new Array;
        chars = new Array;
        pointCount = 0;

        for (; ;) {

            if (ch === '') break;

            if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {

                ch = source.charAt( ++index );
                continue;

            }

            if (ch === '(' || ch === ')' || ch === '[' || ch === ']' || ch == '|' || ch === '.' || ch === ';' || ch === '^') {

                tokens.push( { type: ch, value: null } );
                ch = source.charAt( ++index );
                continue;

            }

            if (ch >= '0' && ch <= '9') {

                chars.length = 0;
                pointCount = 0;

                do {

                    chars.push( ch );
                    ch = source.charAt( ++index );

                    if (ch === '.') pointCount++;

                } while (ch >= '0' && ch <= '9' && pointCount < 2);

                tokens.push({ type: 'number', value: parseInt(chars.join(''), 10) });
                continue;

            }

            if (ch === "'") {

                chars.length = 0;
                ch = source.charAt( ++index );

                for (; ;) {

                    if (ch === '') throw new Error('Unterminated string literal');

                    if (ch === "'") {

                        ch = source.charAt( ++index );
                        if ( ch !== "'" ) break;

                    }

                    chars.push( ch );
                    ch = source.charAt( ++index );

                }

                tokens.push({ type: 'string', value: chars.join('') });
                continue;

            }

            if (ch == ':') {

                chars.length = 0;

                do {

                    chars.push( ch );
                    ch = source.charAt( ++index );

                } while (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9');

                tokens.push({ type: 'param', value: chars.join('') });
                continue;

            }

            if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z') {

                chars.length = 0;

                do {

                    chars.push( ch );
                    ch = source.charAt( ++index );

                } while (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9');

                if ( ch === ':' ) {
 
                    ch = source.charAt( ++index );
                    tokens.push( { type: 'keyword', value: chars.join( '' ) + ':' } );
                    continue;

                }

                tokens.push({ type: 'name', value: chars.join('') });
                continue;

            }

            throw new Error('Unexpected character: ' + ch);

        }

        return tokens;

    }

}

class Parser {

    #tokens = null;
    #tokenIndex = 0;

    scope( fn ) {

        var savedIndex;

        savedIndex = this.#tokenIndex;
        if ( ! fn() ) this.#tokenIndex = savedIndex; 

    }

    parse( source ) {

        var tokenizer;

        tokenizer = new Tokenizer;
        this.#tokens = tokenizer.tokenize( source );
        this.#tokenIndex = 0;

        this.scope( () => {



        } );

    }

}

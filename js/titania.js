
function tokenize(source) {
    var tokens, done, cur, ch, chars, doneSub, nch, escapeCh, quoteCh;
    
    tokens = [];
    done = false;
    cur = -1;
    ch = null;
    chars = [];

    do {
        while (ch === ' ' || ch === '\n' || ch === '\t' || ch === '\r') {
            ch = source.charAt(++cur);
        }

        if (ch === '') {
            done = true;
        } else if (ch === null) {
            chars.length = 0;
            doneSub = false;

            do {
                ch = source.charAt(++cur);
                if (ch === '') {
                    doneSub = true;
                } else if (ch === '[' || ch == ']') {
                    escapeCh = ch;
                    nch = source.charAt(cur + 1);
                    if (nch === escapeCh) {
                        chars.push(escapeCh);
                        ch = source.charAt(++cur);
                    } else {
                        if (escapeCh === '[') {
                            doneSub = true;
                        } else {
                            throw new Error('Unmatched closing bracket at position ' + cur);
                        }
                    }
                } else {
                    chars.push(ch);
                }
            } while (!doneSub);

            if (chars.length > 0) {
                tokens.push({ type: 'text', value: chars.join('') });
            }
        } else if (ch === '[') {
            tokens.push({ type: '[', value: null });
            ch = source.charAt(++cur);
        } else if (ch === ']') {
            tokens.push({ type: ']', value: null });
            ch = null;
        } else if (ch === '"' || ch === "'") {
            quoteCh = ch;
            chars.length = 0;
            doneSub = false;

            do {
                ch = source.charAt(++cur);
                if (ch === '') {
                    throw new Error('Unterminated string literal');
                } else if (ch === quoteCh) {
                    nch = source.charAt(cur + 1);
                    if (nch === quoteCh) {
                        chars.push(quoteCh);
                        ch = source.charAt(++cur);
                    } else {
                        doneSub = true;
                    }
                } else {
                    chars.push(ch);
                }
            } while (!doneSub);

            if (chars.length > 0) {
                tokens.push({ type: 'string', value: chars.join('') });
            }
        }
    } while (!done);

    console.log(tokens);
}

tokenize(`[] Teste ['teste'] "xxxxxx "`);
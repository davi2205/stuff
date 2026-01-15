



class Tokenizer {

    tokenize(source) {

        var i, ch, tokens, chars, pointCount;

        i = 0;
        ch = source.charAt(i);
        tokens = new Array;
        chars = new Array;
        pointCount = 0;

        for (; ;) {

            if (ch === '') break;

            if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {

                ch = source.charAt(++i);
                continue;

            }

            if (ch === '(' || ch === ')' || ch === '[' || ch === ']' || ch == '|' || ch === '.' || ch === ';' || ch === '^') {

                tokens.push({ type: ch, value: null });
                ch = source.charAt(++i);
                continue;

            }

            if (ch >= '0' && ch <= '9') {

                chars.length = 0;
                pointCount = 0;

                do {

                    chars.push(ch);
                    ch = source.charAt(++i);

                    if (ch === '.') pointCount++;

                } while (ch >= '0' && ch <= '9' && pointCount < 2);

                tokens.push({ type: 'number', value: parseInt(chars.join(''), 10) });
                continue;

            }

            if (ch === "'") {

                chars.length = 0;
                ch = source.charAt(++i);

                for (; ;) {

                    if (ch === '') throw new Error('Unterminated string literal');

                    if (ch === "'") {

                        ch = source.charAt(++i);
                        if (ch !== "'") break;

                    }

                    chars.push(ch);
                    ch = source.charAt(++i);

                }

                tokens.push({ type: 'string', value: chars.join('') });
                continue;

            }

            if (ch == ':') {

                chars.length = 0;

                do {

                    chars.push(ch);
                    ch = source.charAt(++i);

                } while (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9');

                tokens.push({ type: 'param', value: chars.join('') });
                continue;

            }

            if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z') {

                chars.length = 0;

                do {

                    chars.push(ch);
                    ch = source.charAt(++i);

                } while (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9');

                if (ch === ':') {

                    ch = source.charAt(++i);
                    tokens.push({ type: 'keyword', value: chars.join('') + ':' });
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

class ParserRuleBuilder {

    #type;
    #value;
    #children;
    #min;
    #max;

    constructor(type) {

        this.#type = type;
        this.#value = null;
        this.#children = new Array;
        this.#min = 1;
        this.#max = 1;

    }

    value(value) {

        this.#value = value;
        return this;

    }

    children(children) {

        this.#children = children;
        return this;

    }

    count(min, max) {

        this.#min = min;
        this.#max = max;
        return this;

    }

    maybe() {

        return this.count(0, 1);

    }

    oneOrMany() {

        return this.count(1, Infinity);

    }

    zeroOrMany() {

        return this.count(0, Infinity);

    }

    build() {

        return {
            type: this.#type,
            value: this.#value,
            children: this.#children.map(child => child.build()),
            min: this.#min,
            max: this.#max
        };

    }

}

class Parser {

    #tokens;
    #tokenIndex;

    #expectFirst(type, ...items) {
        var i, len, nodeChildOrChildren;

        for (i = 0, len = items.length; i < len; i++) {
            nodeChildOrChildren = items[i].call(this);
            if (nodeChildOrChildren !== null) break;
        }

        if (nodeChildOrChildren === null) return null;
        if (type === null) return nodeChildOrChildren;

        return {
            type: type,
            children: Array.isArray(nodeChildOrChildren) ? nodeChildOrChildren : [nodeChildOrChildren]
        };
    }

    #expect(type, ...items) {

        var savedIndex, nodeChildren, i, len, item, nodeChildOrChildren;

        savedIndex = this.#tokenIndex;
        nodeChildren = new Array;

        for (i = 0, len = items.length; i < len; i++) {

            item = items[i];
            if (item === null) continue;

            if (item instanceof Function) {

                nodeChildOrChildren = item.call(this);
                if (nodeChildOrChildren === null) {

                    this.#tokenIndex = savedIndex;
                    return null;

                }

                if (Array.isArray(nodeChildOrChildren)) nodeChildren.push(...nodeChildOrChildren);
                else nodeChildren.push(nodeChildOrChildren);
                continue;

            }

            if (typeof item === 'string') {

                nodeChildOrChildren = this.#tokens[this.#tokenIndex];
                if (!nodeChildOrChildren || nodeChildOrChildren.type !== item) {

                    this.#tokenIndex = savedIndex;
                    return null;

                }

                nodeChildren.push(nodeChildOrChildren);
                this.#tokenIndex++;
                continue;

            }

            throw new Error('Unexpected item');

        }

        if (type === null) return nodeChildren;

        return {
            type: type,
            children: nodeChildren
        };

    }

    parse(source) {

        const unnamed = null;

        var tokenizer, messageHeader, node;

        tokenizer = new Tokenizer;
        this.#tokens = tokenizer.tokenize(source);
        this.#tokenIndex = 0;

        messageHeader = () => this.#expectFirst(unnamed,
            () => this.#expect('messageHeader', 'name'),
            () => this.#expect('messageHeader', 'keyword', 'name'),
        );

        node = this.#expect('message', messageHeader);

        console.log(JSON.stringify(node, null, 4));
    }

}


var p = new Parser;
p.parse("print: teste");
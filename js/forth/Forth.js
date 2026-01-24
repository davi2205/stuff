
class Forth {
    #cellByRowsAndCols = new Map;

    colNameToIndex(colName) {
        var i, index, len, ref, char;
        index = 0;
        ref = colName.split('');
        for (i = 0, len = ref.length; i < len; i++) {
            char = ref[i];
            index *= 26;
            index += char.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
        }
        return index - 1;
    }

    parseColRow(cell) {
        var match;
        match = cell.trim().match(/^([A-Z]+)([0-9]+)$/);
        if (!match) {
            throw new Error("Invalid cell format: " + cell);
        }
        return [this.colNameToIndex(match[1]), parseInt(match[2], 10) - 1];
    }
}

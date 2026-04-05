export class Widget {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    constructor() {
        //
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getSuggestedWidth() {
        return 0;
    }
    getSuggestedHeight() {
        return 0;
    }
    setBounds(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
//# sourceMappingURL=Widget.js.map
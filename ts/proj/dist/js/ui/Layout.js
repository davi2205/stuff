import { XAlignment } from "./XAlignment.js";
import { YAlignment } from "./YAlignment.js";
export class Layout {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    gapSize = 0;
    padding = 0;
    entries = [];
    entryByItem(item) {
        var i, len;
        for (i = 0, len = this.entries.length; i < len; i++) {
            if (this.entries[i].item === item) {
                return this.entries[i];
            }
        }
        return null;
    }
    add(item) {
        if (this.entryByItem(item)) {
            throw new Error("Item is already added.");
        }
        this.entries.push(new LayoutEntry(item));
    }
    remove(item) {
        var entry;
        entry = this.entryByItem(item);
        if (!entry) {
            throw new Error("Item is not found.");
        }
        this.entries.splice(this.entries.indexOf(entry), 1);
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
    setBounds(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    setGapSize(gapSize) {
        this.gapSize = gapSize;
    }
    setPadding(padding) {
        this.padding = padding;
    }
    setItemXAlignment(item, xAlignment) {
        var entry;
        entry = this.entryByItem(item);
        if (!entry) {
            throw new Error("Item is not found.");
        }
        entry.xAlignment = xAlignment;
    }
    setItemXFillFactor(item, xFillFactor) {
        var entry;
        entry = this.entryByItem(item);
        if (!entry) {
            throw new Error("Item is not found.");
        }
        entry.xFillFactor = xFillFactor;
    }
    setItemYAlignment(item, yAlignment) {
        var entry;
        entry = this.entryByItem(item);
        if (!entry) {
            throw new Error("Item is not found.");
        }
        entry.yAlignment = yAlignment;
    }
    setItemYFillFactor(item, yFillFactor) {
        var entry;
        entry = this.entryByItem(item);
        if (!entry) {
            throw new Error("Item is not found.");
        }
        entry.yFillFactor = yFillFactor;
    }
    doColumnLayout() {
        var resolvedX, resolvedY, resolvedWidth, resolvedHeight;
        var totalHeightToFill;
        var totalFillFactor;
        var i, len;
        var entry;
        var itemX, itemY, itemWidth, itemHeight;
        if (this.entries.length === 0) {
            return;
        }
        resolvedX = this.x + this.padding;
        resolvedY = this.y + this.padding;
        resolvedWidth = this.width - 2 * this.padding;
        resolvedHeight = this.height - 2 * this.padding;
        totalHeightToFill = resolvedHeight - (this.entries.length - 1) * this.gapSize;
        totalFillFactor = 0;
        for (i = 0, len = this.entries.length; i < len; i++) {
            entry = this.entries[i];
            if (entry.yFillFactor === null) {
                totalHeightToFill -= entry.item.getHeight();
            }
            else {
                totalFillFactor += entry.yFillFactor;
            }
        }
        totalHeightToFill = Math.max(0, totalHeightToFill);
        itemY = resolvedY;
        for (i = 0, len = this.entries.length; i < len; i++) {
            entry = this.entries[i];
            if (entry.yFillFactor !== null) {
                itemHeight = totalFillFactor > 0 ? totalHeightToFill * entry.yFillFactor / totalFillFactor : 0;
            }
            else {
                itemHeight = entry.item.getHeight();
            }
            if (entry.xFillFactor !== null) {
                itemWidth = resolvedWidth * Math.max(0, Math.min(1, entry.xFillFactor));
            }
            else {
                itemWidth = entry.item.getWidth();
            }
            itemX = resolvedX;
            if (entry.xAlignment === XAlignment.Center) {
                itemX += (resolvedWidth - itemWidth) / 2;
            }
            else if (entry.xAlignment === XAlignment.Right) {
                itemX += resolvedWidth - itemWidth;
            }
            entry.item.setBounds(itemX, itemY, itemWidth, itemHeight);
            itemY += itemHeight + this.gapSize;
        }
    }
    doRowLayout() {
        var resolvedX, resolvedY, resolvedWidth, resolvedHeight;
        var totalWidthToFill;
        var totalFillFactor;
        var i, len;
        var entry;
        var itemX, itemY, itemWidth, itemHeight;
        if (this.entries.length === 0) {
            return;
        }
        resolvedX = this.x + this.padding;
        resolvedY = this.y + this.padding;
        resolvedWidth = this.width - 2 * this.padding;
        resolvedHeight = this.height - 2 * this.padding;
        totalWidthToFill = resolvedWidth - (this.entries.length - 1) * this.gapSize;
        totalFillFactor = 0;
        for (i = 0, len = this.entries.length; i < len; i++) {
            entry = this.entries[i];
            if (entry.xFillFactor === null) {
                totalWidthToFill -= entry.item.getWidth();
            }
            else {
                totalFillFactor += entry.xFillFactor;
            }
        }
        totalWidthToFill = Math.max(0, totalWidthToFill);
        itemX = resolvedX;
        for (i = 0, len = this.entries.length; i < len; i++) {
            entry = this.entries[i];
            if (entry.xFillFactor !== null) {
                itemWidth = totalFillFactor > 0 ? totalWidthToFill * entry.xFillFactor / totalFillFactor : 0;
            }
            else {
                itemWidth = entry.item.getWidth();
            }
            if (entry.yFillFactor !== null) {
                itemHeight = resolvedHeight * Math.max(0, Math.min(1, entry.yFillFactor));
            }
            else {
                itemHeight = entry.item.getHeight();
            }
            itemY = resolvedY;
            if (entry.yAlignment === YAlignment.Center) {
                itemY += (resolvedHeight - itemHeight) / 2;
            }
            else if (entry.yAlignment === YAlignment.Bottom) {
                itemY += resolvedHeight - itemHeight;
            }
            entry.item.setBounds(itemX, itemY, itemWidth, itemHeight);
            itemX += itemWidth + this.gapSize;
        }
    }
}
class LayoutEntry {
    item;
    xAlignment = XAlignment.Left;
    yAlignment = YAlignment.Top;
    xFillFactor = null;
    yFillFactor = null;
    expanded = false;
    constructor(item) {
        this.item = item;
    }
}
//# sourceMappingURL=Layout.js.map
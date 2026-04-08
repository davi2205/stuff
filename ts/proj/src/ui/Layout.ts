import { Bounded } from "./Bounded.js";
import { XAlignment } from "./XAlignment.js";
import { YAlignment } from "./YAlignment.js";

export class Layout implements Bounded {
  private x: number = 0;
  private y: number = 0
  private width: number = 0;
  private height: number = 0;
  private gapSize: number = 0;
  private padding: number = 0;
  private entries: LayoutEntry[] = [];

  private entryByItem(item: Bounded): LayoutEntry | null {
    var i, len: number;

    for (i = 0, len = this.entries.length; i < len; i++) {
      if (this.entries[i].item === item) {
        return this.entries[i];
      }
    }

    return null;
  }

  add(item: Bounded): void {
    if (this.entryByItem(item)) {
      throw new Error("Item is already added.");
    }
    this.entries.push(new LayoutEntry(item));
  }

  remove(item: Bounded): void {
    var entry: LayoutEntry | null;

    entry = this.entryByItem(item);
    if (!entry) {
      throw new Error("Item is not found.");
    }

    this.entries.splice(this.entries.indexOf(entry), 1);
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  setBounds(x: number, y: number, width: number, height: number): void {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  setGapSize(gapSize: number): void {
    this.gapSize = gapSize;
  }

  setPadding(padding: number): void {
    this.padding = padding;
  }

  setItemXAlignment(item: Bounded, xAlignment: XAlignment): void {
    var entry: LayoutEntry | null;

    entry = this.entryByItem(item);
    if (!entry) {
      throw new Error("Item is not found.");
    }

    entry.xAlignment = xAlignment;
  }

  setItemXFillFactor(item: Bounded, xFillFactor: number | null): void {
    var entry: LayoutEntry | null;

    entry = this.entryByItem(item);
    if (!entry) {
      throw new Error("Item is not found.");
    }

    entry.xFillFactor = xFillFactor;
  }

  setItemYAlignment(item: Bounded, yAlignment: YAlignment): void {
    var entry: LayoutEntry | null;

    entry = this.entryByItem(item);
    if (!entry) {
      throw new Error("Item is not found.");
    }

    entry.yAlignment = yAlignment;
  }

  setItemYFillFactor(item: Bounded, yFillFactor: number | null): void {
    var entry: LayoutEntry | null;

    entry = this.entryByItem(item);
    if (!entry) {
      throw new Error("Item is not found.");
    }

    entry.yFillFactor = yFillFactor;
  }

  doColumnLayout(): void {
    var resolvedX, resolvedY, resolvedWidth, resolvedHeight: number;
    var totalHeightToFill: number;
    var totalFillFactor: number;
    var i, len: number;
    var entry: LayoutEntry;
    var itemX, itemY, itemWidth, itemHeight: number;

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
      } else {
        totalFillFactor += entry.yFillFactor!;
      }
    }
    totalHeightToFill = Math.max(0, totalHeightToFill);

    itemY = resolvedY;
    for (i = 0, len = this.entries.length; i < len; i++) {
      entry = this.entries[i];
      if (entry.yFillFactor !== null) {
        itemHeight = totalFillFactor > 0 ? totalHeightToFill * entry.yFillFactor! / totalFillFactor : 0;
      } else {
        itemHeight = entry.item.getHeight();
      }
      if (entry.xFillFactor !== null) {
        itemWidth = resolvedWidth * Math.max(0, Math.min(1, entry.xFillFactor!));
      } else {
        itemWidth = entry.item.getWidth();
      }
      itemX = resolvedX;
      if (entry.xAlignment === XAlignment.Center) {
        itemX += (resolvedWidth - itemWidth) / 2;
      } else if (entry.xAlignment === XAlignment.Right) {
        itemX += resolvedWidth - itemWidth;
      }
      entry.item.setBounds(itemX, itemY, itemWidth, itemHeight);
      itemY += itemHeight + this.gapSize;
    }
  }

  doRowLayout(): void {
    var resolvedX, resolvedY, resolvedWidth, resolvedHeight: number;
    var totalWidthToFill: number;
    var totalFillFactor: number;
    var i, len: number;
    var entry: LayoutEntry;
    var itemX, itemY, itemWidth, itemHeight: number;

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
      } else {
        totalFillFactor += entry.xFillFactor!;
      }
    }
    totalWidthToFill = Math.max(0, totalWidthToFill);

    itemX = resolvedX;
    for (i = 0, len = this.entries.length; i < len; i++) {
      entry = this.entries[i];
      if (entry.xFillFactor !== null) {
        itemWidth = totalFillFactor > 0 ? totalWidthToFill * entry.xFillFactor! / totalFillFactor : 0;
      } else {
        itemWidth = entry.item.getWidth();
      }
      if (entry.yFillFactor !== null) {
        itemHeight = resolvedHeight * Math.max(0, Math.min(1, entry.yFillFactor!));
      } else {
        itemHeight = entry.item.getHeight();
      }
      itemY = resolvedY;
      if (entry.yAlignment === YAlignment.Center) {
        itemY += (resolvedHeight - itemHeight) / 2;
      } else if (entry.yAlignment === YAlignment.Bottom) {
        itemY += resolvedHeight - itemHeight;
      }
      entry.item.setBounds(itemX, itemY, itemWidth, itemHeight);
      itemX += itemWidth + this.gapSize;
    }
  }
}

class LayoutEntry {
  item: Bounded;
  xAlignment: XAlignment = XAlignment.Left;
  yAlignment: YAlignment = YAlignment.Top;
  xFillFactor: number | null = null;
  yFillFactor: number | null = null;
  expanded: boolean = false;

  constructor(item: Bounded) {
    this.item = item;
  }
}
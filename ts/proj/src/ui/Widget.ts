import { Bounded } from "./Bounded.js";

export abstract class Widget implements Bounded {
  private x: number = 0;
  private y: number = 0;
  private width: number = 0;
  private height: number = 0;

  constructor() {
    //
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

  getSuggestedWidth(): number {
    return 0;
  }

  getSuggestedHeight(): number {
    return 0;
  }

  setBounds(x: number, y: number, width: number, height: number): void {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export interface Bounded {
  getX(): number;
  getY(): number;
  getWidth(): number;
  getHeight(): number;
  setBounds(x: number, y: number, width: number, height: number): void;
}

export function isBounded(object: any): object is Bounded {
  return typeof object.getX === "function" &&
         typeof object.getY === "function" &&
         typeof object.getWidth === "function" &&
         typeof object.getHeight === "function" &&
         typeof object.setBounds === "function";
}
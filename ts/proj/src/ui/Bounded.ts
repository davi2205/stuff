
export interface Bounded {
  getX(): number;
  getY(): number;
  getWidth(): number;
  getHeight(): number;
  setBounds(x: number, y: number, width: number, height: number): void;
}
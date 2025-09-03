export type ShapeType = {
  id: string;
  X: number;
  Y: number;
  height: number;
  width: number;
  color: string;
  borderRadius: string;
  transform: string;
};
export type StartPoint = {
  X: number;
  Y: number;
};
export type Position = {
  x: number;
  y: number;
  height: number;
  width: number;
};
export type dragOffset = Omit<Position, "height" | "width">;
export type ShapeProps = {
  left: number;
  top: number;
  width: number;
  height: number;
  borderRadius: string;
  id: string;
  color: string;
  transform: string;
  draggingRef: React.RefObject<boolean>;
  setIsInside: React.Dispatch<React.SetStateAction<boolean>>;
  setShapeList: React.Dispatch<React.SetStateAction<ShapeType[]>>;
};

export type ShapeDrawProps = Pick<
  ShapeProps,
  "left" | "top" | "width" | "height" | "color" | "borderRadius" | "transform"
>;

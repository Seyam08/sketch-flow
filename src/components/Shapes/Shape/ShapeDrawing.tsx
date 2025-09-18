import type { Position, ShapeDrawProps } from "@/types/shape.types";
import { useEffect, useState, type JSX } from "react";

export default function ShapeDrawing({
  left,
  top,
  width,
  height,
  color,
  borderRadius,
  transform,
}: ShapeDrawProps): JSX.Element {
  const [currentPosition, setCurrentPosition] = useState<Position>({
    x: left,
    y: top,
    height: height,
    width: width,
  });

  useEffect(() => {
    setCurrentPosition({ x: left, y: top, height: height, width: width });
  }, [left, top, height, width]);

  return (
    <div
      className="absolute border-2 border-foreground opacity-65 cursor-grab"
      style={{
        left: `${currentPosition.x}px`,
        top: `${currentPosition.y}px`,
        width: `${currentPosition.width}px`,
        height: `${currentPosition.height}px`,
        backgroundColor: color,
        borderRadius: borderRadius,
        transform: transform,
      }}
    ></div>
  );
}

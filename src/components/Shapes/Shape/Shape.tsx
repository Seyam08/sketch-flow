import type {
  Position,
  ShapeProps,
  ShapeType,
  dragOffset,
} from "@/types/shape.types";
import React, { useEffect, useState, type JSX } from "react";

export default function Shape({
  left,
  top,
  width,
  height,
  id,
  color,
  borderRadius,
  draggingRef,
  setIsInside,
  setShapeList,
  transform,
}: ShapeProps): JSX.Element {
  const [grab, setGrab] = useState(false); // for tracking grab
  const [dragOffset, setDragOffset] = useState<dragOffset>({ x: 0, y: 0 }); // for tracking offset between mouse position and shape top-left corner
  const [currentPosition, setCurrentPosition] = useState<Position>({
    x: left,
    y: top,
    height: height,
    width: width,
  }); // for setting the current position from props

  useEffect(() => {
    setCurrentPosition({ x: left, y: top, height: height, width: width });
  }, [left, top, height, width]); // updating current props if props change

  useEffect((): void | (() => void) => {
    const handlePointerMove = (e: PointerEvent): void => {
      if (!grab) return; // returning if shape is not grabbed

      draggingRef.current = true; // setting true cause dragging is started

      let x = e.clientX - dragOffset.x;
      let y = e.clientY - dragOffset.y;

      // Boundary check (lock inside screen)
      const maxX = window.innerWidth - width;
      const maxY = window.innerHeight - height;

      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > maxX) x = maxX;
      if (y > maxY) y = maxY;
      setCurrentPosition((prev) => ({ ...prev, x, y })); // updating the current position while dragging
    };

    const handlePointerUp = (): void => {
      if (!grab) return; // returning if shape is not grabbed
      setGrab(false); // releasing the grab
      setIsInside(false); // setting inInside false when mouseUp from shape
      setTimeout(() => {
        draggingRef.current = false;
      }, 0); // setting drag false cause drag finished and using setTimeout to update state at last

      setShapeList((prev: ShapeType[]): ShapeType[] =>
        prev.map(
          (item: ShapeType): ShapeType =>
            item.id === id
              ? { ...item, X: currentPosition.x, Y: currentPosition.y }
              : item
        )
      ); // Updating the shape list with the new shape's updated position
    };

    if (grab) {
      // only add event listeners if shape is grabbed
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }; // remove event listener through cleanup function
  }, [grab, dragOffset, id, setIsInside, setShapeList, currentPosition]); // for re-run code if dependencies change

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Capture pointer to keep receiving events outside div
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    setIsInside(true); // setting isInside if mouse is down on shape
    setGrab(true); // making sure that shape is grabbed
    setDragOffset({
      x: e.clientX - currentPosition.x,
      y: e.clientY - currentPosition.y,
    }); // setting drag offset
  };

  return (
    <div
      className={`absolute border-2 border-foreground opacity-65 ${
        grab ? "cursor-grabbing" : "cursor-grab"
      }`}
      onPointerDown={onPointerDown}
      style={{
        left: `${currentPosition.x}px`,
        top: `${currentPosition.y}px`,
        width: `${currentPosition.width}px`,
        height: `${currentPosition.height}px`,
        backgroundColor: color,
        borderRadius: borderRadius,
        transform: transform,
        touchAction: "none",
      }}
    ></div>
  );
}

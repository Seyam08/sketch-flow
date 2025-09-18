import ClearAll from "@/ClearAll/ClearAll";
import Shape from "@/components/Shapes/Shape/Shape";
import ShapeDrawing from "@/components/Shapes/Shape/ShapeDrawing";
import { clamp } from "@/lib/utils";
import { useShapeStore, type ShapeKind } from "@/stores/shapeStore";
import type { ShapeType, StartPoint } from "@/types/shape.types";
import { randomId } from "@/util/randomId";
import { useRef, useState, type JSX } from "react";

export default function ShapesDrawer(): JSX.Element {
  const [isDrawing, setIsDrawing] = useState<boolean>(false); // state for control shape drawing start-end
  const [isInside, setIsInside] = useState<boolean>(false); // state for control shape dragging start-end
  const startPoint = useRef<StartPoint>({
    X: 0,
    Y: 0,
  }); // for declaring and hold start point value
  const [shape, setShape] = useState<ShapeType | null>(null); // for showing shape after created
  const [shapeList, setShapeList] = useState<ShapeType[]>([]); // for creating array of shape

  const [color] = useState<string>("transparent");
  const [id, setId] = useState<string>(""); // to preserve a random id for shape
  const draggingRef = useRef(false); // for tracking drag
  const shapeType: ShapeKind = useShapeStore((state) => state.shape);
  const minSize = 40;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    // Prevent scrolling on touch devices while drawing
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    if (isInside) {
      return; // retuning so that dragging can't be start inside of a shape
    }
    setIsDrawing(true);
    startPoint.current = { X: e.clientX, Y: e.clientY }; // holding the start value while starting to draw

    const id = randomId();
    setId(id);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (isDrawing && !isInside) {
      // only execute if drawing started and not inside of any shape
      draggingRef.current = true; // for tracking drag
      const startX = startPoint.current.X;
      const startY = startPoint.current.Y;
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      // Determine top-left corner regardless of drag direction
      let x = Math.min(cursorX, startX);
      let y = Math.min(cursorY, startY);

      // Calculate width/height (always positive)
      const w = Math.abs(cursorX - startX);
      const h = Math.abs(cursorY - startY);

      // For a square, use the bigger side
      let size = Math.max(w, h);

      // Viewport limits
      const maxX = window.innerWidth;
      const maxY = window.innerHeight;

      // Clamp X, Y (not below 0 and not outside viewport)
      x = clamp(x, 0, maxX);
      y = clamp(y, 0, maxY);

      // Make sure the square doesn't go outside the viewport
      size = Math.min(size, maxX - x, maxY - y);

      // Safety to avoid negative size
      size = Math.max(0, size);

      let finalShape;

      if (shapeType === "rectangle") {
        finalShape = {
          id: id,
          X: x,
          Y: y,
          height: h,
          width: w,
          color: color,
          borderRadius: "16px 16px 16px 16px",
          transform: "rotate(0deg)",
        };
      }
      if (shapeType === "diamond") {
        finalShape = {
          id: id,
          X: x,
          Y: y,
          height: size,
          width: size,
          color: color,
          borderRadius: "16px 16px 16px 16px",
          transform: "rotate(45deg)",
        };
      }
      if (shapeType === "circle") {
        finalShape = {
          id: id,
          X: x,
          Y: y,
          height: size,
          width: size,
          color: color,
          borderRadius: "50% 50% 50% 50%",
          transform: "rotate(0deg)",
        };
      }
      if (shapeType === "square") {
        finalShape = {
          id: id,
          X: x,
          Y: y,
          height: size,
          width: size,
          color: color,
          borderRadius: "16px 16px 16px 16px",
          transform: "rotate(0deg)",
        };
      }

      finalShape && setShape(finalShape);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>): void => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    setIsDrawing(false); // drawing finished
    shape &&
      shape.height > minSize &&
      shape.width > minSize &&
      setShapeList((prev) => [...prev, shape]); // if shape exists, add it to the list
    setShape(null); // resting the drawn shape
    setTimeout(() => (draggingRef.current = false), 0); // setting drag false cause drag finished and using setTimeout to update state at last
  };

  return (
    <>
      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        className={`h-screen w-screen relative touch-none ${
          shapeType ? "cursor-crosshair" : "cursor-auto"
        }`}
      >
        {shapeList.map((rect: ShapeType, index: number): JSX.Element => {
          return (
            <Shape
              key={index}
              height={rect.height}
              width={rect.width}
              left={rect.X}
              top={rect.Y}
              borderRadius={rect.borderRadius}
              id={rect.id}
              color={rect.color}
              draggingRef={draggingRef}
              setIsInside={setIsInside}
              setShapeList={setShapeList}
              transform={rect.transform}
            />
          );
        })}
        {/* for only showing when shape is being drawn */}
        {shape && (
          <ShapeDrawing
            height={shape.height}
            width={shape.width}
            left={shape.X}
            top={shape.Y}
            borderRadius={shape.borderRadius}
            color={shape.color}
            transform={shape.transform}
          />
        )}
        {/* Clear all shapes button */}
        <ClearAll setShapeList={setShapeList} />
      </div>
    </>
  );
}

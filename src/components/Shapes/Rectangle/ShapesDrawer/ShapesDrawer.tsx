import { useRef, useState, type JSX } from "react";
import ClearAll from "../../../../ClearAll/ClearAll";
import type { ShapeType, StartPoint } from "../../../../types/shape.types";
import { getRandomColor } from "../../../../util/getRandomColor";
import { randomId } from "../../../../util/randomId";
import Shape from "../Shape/Shape";
import ShapeDrawing from "../Shape/ShapeDrawing";

export default function ShapesDrawer(): JSX.Element {
  const [isDrawing, setIsDrawing] = useState<boolean>(false); // state for control shape drawing start-end
  const [isInside, setIsInside] = useState<boolean>(false); // state for control shape dragging start-end
  const startPoint = useRef<StartPoint>({
    X: 0,
    Y: 0,
  }); // for declaring and hold start point value
  const [shape, setShape] = useState<ShapeType | null>(null); // for showing shape after created
  const [shapeList, setShapeList] = useState<ShapeType[]>([]); // for creating array of shape

  const [color, setColor] = useState<string>("gray");
  const [id, setId] = useState<string>(""); // to preserve a random id for shape
  const draggingRef = useRef(false); // for tracking drag

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isInside) {
      return; // retuning so that dragging can't be start inside of a shape
    }
    setIsDrawing(true);
    startPoint.current = { X: e.clientX, Y: e.clientY }; // holding the start value while starting to draw
    setColor(getRandomColor());
    const id = randomId();
    setId(id);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isDrawing && !isInside) {
      // only execute if drawing started and not inside of any shape
      draggingRef.current = true; // for tracking drag
      let x = Math.min(e.clientX, startPoint.current.X);
      let y = Math.min(e.clientY, startPoint.current.Y);
      const w = Math.abs(e.clientX - startPoint.current.X);
      const h = Math.abs(e.clientY - startPoint.current.Y);

      let size = Math.max(w, h);

      setShape({
        id: id,
        X: x,
        Y: y,
        height: size,
        width: size,
        color: color,
        borderRadius: "16px 16px 16px 16px",
        transform: "rotate(45deg)",
      });
    }
  };

  const onMouseUp = (): void => {
    setIsDrawing(false); // drawing finished
    shape && setShapeList((prev) => [...prev, shape]); // if shape exists, add it to the list
    setShape(null); // resting the drawn shape
    setTimeout(() => (draggingRef.current = false), 0); // setting drag false cause drag finished and using setTimeout to update state at last
  };

  return (
    <>
      <div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className="cursor-crosshair h-screen w-screen relative"
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

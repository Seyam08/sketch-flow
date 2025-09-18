import { Circle, Diamond, RectangleHorizontal, Square } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useShapeStore, type ShapeKind } from "@/stores/shapeStore";

export function ShapeSelectGroup() {
  const shape = useShapeStore<ShapeKind>((state) => state.shape);
  const setShape = useShapeStore((state) => state.setShape);
  console.log(shape);
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      className="!shadow-md"
      value={shape}
      onValueChange={(value: ShapeKind) => setShape(value)}
    >
      <ToggleGroupItem
        value="rectangle"
        aria-label="Select Rectangle"
        className="cursor-pointer"
      >
        <RectangleHorizontal className="!h-5 !w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="diamond"
        aria-label="Toggle diamond"
        className="cursor-pointer"
      >
        <Diamond className="!h-5 !w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="square"
        aria-label="Toggle square"
        className="cursor-pointer"
      >
        <Square className="!h-5 !w-6" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="circle"
        aria-label="Toggle circle"
        className="cursor-pointer"
      >
        <Circle className="!h-5 !w-6" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

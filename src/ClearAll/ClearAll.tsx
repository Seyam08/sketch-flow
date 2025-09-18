import { Button } from "@/components/ui/button";
import type { ShapeType } from "@/types/shape.types";
export default function ClearAll({
  setShapeList,
}: {
  setShapeList: React.Dispatch<React.SetStateAction<ShapeType[]>>;
}) {
  const onClearAll = () => {
    setShapeList([]);
  };

  return (
    <div className="fixed bottom-2.5 right-2.5">
      <Button className="cursor-pointer" onClick={onClearAll}>
        Clear All
      </Button>
    </div>
  );
}

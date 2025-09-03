import type { ShapeType } from "../types/allTypes";
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
      <button
        className="bg-red-400 text-white px-4 py-1 rounded-md cursor-pointer"
        onClick={onClearAll}
      >
        Clear All
      </button>
    </div>
  );
}

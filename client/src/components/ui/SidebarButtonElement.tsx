import { FormElement } from "./FormElements";
import { useDraggable } from "@dnd-kit/core";

const SidebarButtonElement = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerBtnElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <button
      ref={draggable.setNodeRef}
      className={`flex flex-col gap-2 items-center justify-center w-[120px] h-[120px] border rounded-md shadow-sm cursor-grab hover:bg-gray-100 ${
        draggable.isDragging ? "ring-2 ring-primary" : ""
      }`}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </button>
  );
};

export const SidebarButtonElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <button className="flex flex-col gap-2 items-center justify-center w-[120px] h-[120px] border rounded-md shadow-sm cursor-grab hover:bg-gray-100">
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </button>
  );
};

export default SidebarButtonElement;

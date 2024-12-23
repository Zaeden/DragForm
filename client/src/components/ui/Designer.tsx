import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import DesignerSidebar from "./DesignerSidebar";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import useDesigner from "../../hooks/useDesigner";
import { idGenerator } from "../../lib/idGenerator";
import { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      {/* Left side where elements are dropped */}
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={`border shadow-md bg-white max-w-[920px] h-[470px] m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto ${
            droppable.isOver && "ring-2"
          } `}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center fnt-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-gray-100"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => {
                return (
                  <DesignerElementWrapper key={element.id} element={element} />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { removeElement } = useDesigner();

  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col hover:cursor-pointer rounded-md ring-1 ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      />

      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full z-30">
            <button
              className="flex justify-center items-center h-full p-4 border rounded-md rounded-l-none bg-red-500"
              onClick={() => removeElement(element.id)}
            >
              <BiSolidTrash className="h-6 w-6" />
            </button>
          </div>
          <div className="flex inset-0 items-center justify-center h-full w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#6B7280] bg-gray-50 opacity-90 animate-pulse z-20">
            <p className="text-sm">Click for properties or drag to move</p>
          </div>
        </>
      )}

      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-gray-800 rounded-b-none" />
      )}

      <div
        className={`flex w-full h-[120px] items-center rounded-md px-4 py-2 pointer-events-none ${
          mouseIsOver && "opacity-30"
        } `}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-gray-800 rounded-t-none" />
      )}
    </div>
  );
};

export default Designer;

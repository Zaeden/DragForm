import { DndContext } from "@dnd-kit/core";
import { FormType } from "../ui/FormCard";
import Designer from "./Designer";
import PreviewDialogButton from "./PreviewDialogButton";
import PublishFormButton from "./PublishFormButton";
import SaveFormButton from "./SaveFormButton";
import DragOverlayWrapper from "./DragOverlayWrapper";

const FormBuilder = ({ form }: { form: FormType }) => {
  return (
    <DndContext>
      <main className="flex flex-col w-full min-h-screen overflow-hidden">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-gray-600 text-muted-foreground mr-2">
              Form:
            </span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            )}
          </div>
        </nav>
        <div className="w-full h-1 flex-grow flex items-center justify-center relative overflow-auto bg-[url(/graph-paper.svg)] ">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;

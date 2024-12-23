import { FormElements } from "./FormElements";
import SidebarButtonElement from "./SidebarButtonElement";

const DesignerSidebar = () => {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-white overflow-y-auto h-full">
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </aside>
  );
};

export default DesignerSidebar;

import { MdPreview } from "react-icons/md";

const PreviewDialogButton = () => {
  return (
    <button className="flex border rounded-md px-4 py-1.5 shadow-sm font-semibold gap-2 hover:bg-gray-100">
      <MdPreview className="h-6 w-6" />
      Preview
    </button>
  );
};

export default PreviewDialogButton;

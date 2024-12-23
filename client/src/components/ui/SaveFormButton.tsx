import { HiSaveAs } from "react-icons/hi";

const SaveFormButton = () => {
  return (
    <button className="flex items-center border rounded-md px-4 py-1.5 shadow-sm font-semibold gap-2 hover:bg-gray-100">
      <HiSaveAs className="h-4 w-4" />
      Save
    </button>
  );
};

export default SaveFormButton;

import { MdOutlinePublish } from "react-icons/md";

const PublishFormButton = () => {
  return (
    <button className="flex items-center border rounded-md px-4 py-1.5 shadow-sm text-white font-semibold gap-2 bg-gradient-to-r from-indigo-400 to-cyan-400  ">
      <MdOutlinePublish className="h-4 w-4" />
      Publish
    </button>
  );
};

export default PublishFormButton;

import { IoCreateOutline } from "react-icons/io5";

interface CreateFormButtonProps {
  onClick: () => void;
}

export const CreateFormButton: React.FC<CreateFormButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-slate-800 text-white text-md font-semibold rounded-md px-8 py-3 ml-auto mb-6"
    >
      <IoCreateOutline className="mr-2" /> Create Form
    </button>
  );
};

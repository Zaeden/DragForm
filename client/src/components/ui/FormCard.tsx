import { formatDistanceToNow } from "date-fns";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export type FormCardProps = {
  form: FormType;
};

export type FormType = {
  id: number;
  name: string;
  description: string;
  published: boolean;
  createdAt: Date;
  visits: number;
  submissions: number[];
};

const FormCard: React.FC<FormCardProps> = ({ form }) => {
  return (
    <div className="border rounded-xl shadow-md p-6">
      {/* Card Header */}
      <div className="flex items-center gap-2 justify-between">
        <span className="truncate font-bold">{form.name}</span>
        {form.published ? (
          <span>Published</span>
        ) : (
          <span className="rounded-md bg-red-500 text-xs font-bold text-white px-2.5 py-1">
            Draft
          </span>
        )}
      </div>

      <div>
        <div className="text-gray-500 text-sm">
          {formatDistanceToNow(new Date(form.createdAt), { addSuffix: true })}
        </div>

        {form.published && (
          <span className="flex items-center gap-2">
            <span>{form.visits}</span>
            <span>{form.submissions}</span>
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="mt-6 mb-2 h-[20px] truncate text-muted-foreground text-gray-500 font-normal">
        {form.description || "No description"}
      </div>

      {/* Card Footer */}
      <div className="">
        {form.published && (
          <button className="rounded-md w-full py-2 mt-2 bg-gray-800 text-white text-base font-semibold tex gap-4 hover:bg-gray-900">
            <Link
              to={`/forms/${form.id}`}
              className="flex justify-center items-center gap-1"
            >
              View Submissions <BiRightArrowAlt className="text-white" />
            </Link>
          </button>
        )}

        {!form.published && (
          <button className="rounded-md w-full py-2 mt-2 bg-gray-800 text-white text-base font-semibold tex gap-4 hover:bg-gray-900">
            <Link
              to={`/builder/${form.id}`}
              className="flex justify-center items-center gap-2"
            >
              Edit Form <FaEdit className="font-normal text-white" />
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default FormCard;

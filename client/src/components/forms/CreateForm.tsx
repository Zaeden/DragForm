import { useState } from "react";
import { useForm } from "react-hook-form";
import * as apiClient from "../../api-client";
import { FaSpinner } from "react-icons/fa";
import Toast from "../ui/Toast";

interface CreateFormProps {
  onClose: () => void;
}

export type CreateFormType = {
  name: string;
  description: string;
};

const CreateForm: React.FC<CreateFormProps> = ({ onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateFormType>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await apiClient.createForm(data);
      Toast(response.message, "success");
      reset();
      console.log("Form Id : ", response.formId);
    } catch (error) {
      if (error instanceof Error) {
        Toast(error.message, "error");
        throw error;
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
      <div className="border bg-white rounded-md shadow-lg max-w-lg sm:w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-lg text-gray-400 hover:text-gray-800"
        >
          x
        </button>

        {/* Header Section with Centered Title */}
        <div className="mb-4 text-center">
          <h2 className="text-lg font-bold">Create Form</h2>
          <h3 className="text-slate-400 text-md font-medium">
            Create a new form to start collecting responses
          </h3>
        </div>
        <form onSubmit={onSubmit}>
          {/* Name */}
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block font-semibold mb-4 text-slate-800"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Form name is required",
              })}
              className="w-full border rounded-md outline-none px-2 py-1 shadow-sm focus:outline-1 foucus: outline-offset-0 focus:outline-black"
            />

            <div className="h-4">
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block font-semibold mb-4 text-slate-800"
            >
              Description
            </label>
            <textarea
              id="description"
              className="border rounded-md outline-none w-full px-2 py-1 mb-4 shadow-sm focus:outline-1 foucus: outline-offset-0 focus:outline-black"
              {...register("description", {
                required: false,
              })}
            ></textarea>

            <div className="h-4">
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button  */}
          <button
            type="submit"
            className="h-9 w-full p-2 bg-slate-900 text-white text-sm font-semibold rounded-md disabled:opacity-50 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;

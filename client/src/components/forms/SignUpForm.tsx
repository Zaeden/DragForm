import { useForm } from "react-hook-form";
import * as apiClient from "../../api-client";
import Toast from "../ui/Toast";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormData>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await apiClient.register(data);
      Toast(response.message, "success");
      reset();
      navigate("/sign-in");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-1">
            Create your account
          </h2>
          <h3 className="text-md font-medium text-center text-gray-400">
            to continue to DragForm
          </h3>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#103fef]"
            />
            <div className="h-3">
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#103fef]"
            />
            <div className="h-3">
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                min: 8,
              })}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#103fef]"
            />
            <div className="h-3">
              {errors.password && (
                <span className=" text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "Confirm Password is required";
                  } else if (watch("password") !== val) {
                    return "Passwords do not match";
                  }
                },
              })}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#103fef]"
            />
            <div className="h-3">
              {errors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="h-10 w-full py-2 text-white bg-[#103fef] rounded-md focus:outline-none disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <p>
            Already have an account?{" "}
            <a href="/sign-in" className="text-[#103fef] hover:text-indigo-800">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

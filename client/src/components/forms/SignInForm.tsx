import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../../api-client";
import { FaSpinner } from "react-icons/fa";
import Toast from "../ui/Toast";
import { useAuth } from "../../contexts/AuthContext";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await apiClient.login(data);
      Toast(response.message, "success");
      setAuthenticated(true);
      reset();
      navigate("/");
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
            Sign In
          </h2>

          <h3 className="text-md font-medium text-center text-gray-400">
            to continue to DragForm
          </h3>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
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
                min: {
                  value: 8,
                  message: "Password must be atleast 8 characters long",
                },
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
            <button
              type="submit"
              disabled={loading}
              className="h-10 w-full py-2 text-white bg-[#103fef] rounded-md focus:outline-none disabled:opacity-50"
            >
              {loading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <p>
            Don't have an account?{" "}
            <a href="/sign-up" className="text-[#103fef] hover:text-indigo-800">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

import { useEffect, useState } from "react";
import CreateForm from "../components/forms/CreateForm";
import { CreateFormButton } from "../components/ui/CreateFormButton";
import * as apiClient from "../api-client";
import Toast from "../components/ui/Toast";
import FormCard, { FormType } from "../components/ui/FormCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [myForms, setMyForms] = useState<FormType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    const getMyForms = async () => {
      try {
        const response = await apiClient.getForms();
        setMyForms(response.forms);
      } catch (error) {
        if (error instanceof Error) {
          Toast(error.message, "error");
          throw error;
        }
      } finally {
        setIsLoading(false);
      }
    };
    getMyForms();
  }, []);

  const handleToggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <div className="p-8">
        <div className="border-t border-b py-6 mb-6">
          <h2 className="font-bold text-4xl text-gray-700">Your forms</h2>
        </div>

        <CreateFormButton onClick={handleToggleForm} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border rounded-xl shadow-md p-6">
                  <Skeleton
                    height={20}
                    width="80%"
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                  />
                  <Skeleton
                    height={15}
                    width="60%"
                    className="mt-2"
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                  />
                  <Skeleton
                    height={15}
                    width="50%"
                    className="mt-2"
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                  />
                  <Skeleton
                    height={40}
                    className="mt-6"
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                  />
                </div>
              ))
            : myForms.map((form) => <FormCard key={form.id} form={form} />)}
        </div>

        {isFormVisible && <CreateForm onClose={handleCloseForm} />}
      </div>
    </div>
  );
};

export default Home;

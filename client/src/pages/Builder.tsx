import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { FormType } from "../components/ui/FormCard";
import { useEffect, useState } from "react";
import Toast from "../components/ui/Toast";
import Loader from "../components/ui/Loader";
import FormBuilder from "../components/ui/FormBuilder";

const Builder = () => {
  const { formId } = useParams<{ formId: string | undefined }>();

  const [form, setForm] = useState<FormType>({
    id: 0,
    name: "",
    description: "",
    published: false,
    createdAt: new Date(),
    visits: 0,
    submissions: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMyForm = async () => {
      try {
        const response = await apiClient.getFormById(formId);
        setForm(response.form);
      } catch (error) {
        if (error instanceof Error) {
          Toast(error.message, "error");
          throw error;
        }
      } finally {
        setIsLoading(false);
      }
    };
    getMyForm();
  }, [formId]);

  return isLoading ? <Loader /> : <FormBuilder form={form} />;
};

export default Builder;

import { useParams } from "react-router-dom";

const Builder = () => {
  const { formId } = useParams();
  return <div>Builder {formId}</div>;
};

export default Builder;

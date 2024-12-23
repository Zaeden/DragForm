import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../ui/FormElements";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Values here...",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },

  designerComponent: DesignerComponent,
  formComponents: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="block font-semibold ">
        {label}
        {required && "*"}
      </label>
      <input
        readOnly
        disabled
        placeholder={placeHolder}
        className="border rounded-md px-2 py-1.5 shadow-sm"
      />
      {helperText && (
        <p className="text-[0.8rem] text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

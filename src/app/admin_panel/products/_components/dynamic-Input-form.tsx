import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { TextInput } from "@/app/_components/form-input";
import { IconClose, IconPlus } from "@/app/_components/icons/icons";
import { generateID } from "@/utils/string";

interface Field {
  id: string;
}

interface Props {
  register: UseFormRegister<any>;
  errors: any;
  AttributesVariationCategory?: number; 
}

const DynamicInputForm: React.FC<Props> = ({
  register,
  errors,
  AttributesVariationCategory 
}) => {
  const [inputFields, setInputFields] = useState<Field[]>([]);

  const addInput = () => {
    setInputFields([...inputFields, { id: generateID() }]);
  };

  const removeInput = (id: string) => {
    const newInputFields = inputFields.filter((field) => field.id !== id);
    setInputFields(newInputFields);
  };

  return (
    <div className="border-t-[1px] border-t-solid border-t-charcoal mt-7">
      <div className="flex flex-col pt-7">
        <div className="text-white mb-7">
          {AttributesVariationCategory &&
            `متغیر: ${AttributesVariationCategory}`}
        </div>
      </div>

      {inputFields.map((field) => (
        <div
          key={field.id}
          className="border-b-[1px] border-b-solid border-b-charcoal py-7"
        >
          <div className="flex items-center gap-3">
            <span>حذف متغیر</span>
            <IconClose
              viewBox="-5 -5 24 24"
              width={30}
              height={30}
              color="red"
              onClick={() => removeInput(field.id)}
            />
          </div>

          <div className="grid grid-cols-2 gap-7 mt-7 relative">
            <TextInput
              rules={{ required: "فیلد نام الزامی است" }}
              errors={errors}
              label="نام"
              register={register}
              name={`variation_values[value][${field.id}]`}
            />
            <TextInput
              rules={{ required: "فیلد نام الزامی است" }}
              errors={errors}
              label="تعداد"
              register={register}
              name={`variation_values[quantity][${field.id}]`}
            />
            <TextInput
              rules={{ required: "فیلد نام الزامی است" }}
              errors={errors}
              label="شناسه انبار"
              register={register}
              name={`variation_values[sku][${field.id}]`}
            />
            <TextInput
              rules={{ required: "فیلد نام الزامی است" }}
              errors={errors}
              label="قیمت"
              register={register}
              name={`variation_values[price][${field.id}]`}
            />
          </div>
        </div>
      ))}

      {AttributesVariationCategory && (
        <div className="flex items-center mt-7 gap-3">
          <span>اضافه کردن متغیر</span>
          <IconPlus width={30} height={30} color="green" onClick={addInput} />
        </div>
      )}
    </div>
  );
};

export default DynamicInputForm;

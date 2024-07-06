"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/button";
import { TextInput } from "@/app/_components/form-input";
import SelectBoxInput from "@/app/_components/form-input/selectbox-input/selectbox-input";
import { useAddAttribute } from "../_api/add-attribute";
import { AddAttribute } from "../_types/attribute.interface";

const CreateForm: React.FC = () => {
  const router = useRouter();

  const options = [
    { value: 1, label: "فعال" },
    { value: 0, label: "غیر فعال" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAttribute>();

  const addAttribute = useAddAttribute({
    onSuccess: () => {
      router.push("./");
    },
  });

  const onSubmit = (data: AddAttribute) => {
    addAttribute.mutate(data);
  };

  return (
    <form className="mt-[18px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-5">
        <TextInput
          rules={{ required: "فیلد نام الزامی است" }}
          errors={errors}
          label="نام"
          register={register}
          name="name"
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="charcoal"
          size="large"
          isLoading={addAttribute.isLoading}
        >
          ایجاد ویژگی
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;

"use client";

import React from "react";
import { Button } from "@/app/_components/button";
import { TextInput } from "@/app/_components/form-input";
import { useForm } from "react-hook-form";
import { useAddBrand } from "../_api/add-brand";
import { useRouter } from "next/navigation";
import { AddBrand } from "../_types/brand.interface";
import SelectBoxInput from "@/app/_components/form-input/selectbox-input/selectbox-input";

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
  } = useForm<AddBrand>();

  const addBrand = useAddBrand({
    onSuccess: () => {
      router.push("./");
    },
  });

  const onSubmit = (data: any) => {
    addBrand.mutate(data);
  };

  return (
    <form className="mt-[18px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-5">
        <TextInput
          rules={{ required: "فیلد نام الزامی است" }}
          errors={errors}
          label={"نام"}
          register={register}
          name={"name"}
        />

        <TextInput
          rules={{ required: "فیلد نام الزامی است" }}
          errors={errors}
          label={"اسلاگ"}
          register={register}
          name={"slug"}
        />

        <SelectBoxInput
          options={options}
          rules={{ required: "فیلد وضعیت الزامی است" }}
          errors={errors}
          label={"وضعیت"}
          register={register}
          name={"is_active"}
          variant="ghost"
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="charcoal"
          size="large"
          isLoading={addBrand.isLoading}
        >
          ایجاد محصول
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;

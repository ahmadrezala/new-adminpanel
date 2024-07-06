"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/button";
import { TextInput } from "@/app/_components/form-input";
import { useAddTag } from "../_api/add-tag";
import { AddTag } from "../_types/tag.interface";

const CreateForm: React.FC = () => {
  const router = useRouter();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTag>();

  const addTag = useAddTag({
    onSuccess: () => {
      router.push("./");
    },
  });

  const onSubmit = (data: AddTag) => {
    addTag.mutate(data);
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
          isLoading={addTag.isLoading}
        >
          ایجاد تگ
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;

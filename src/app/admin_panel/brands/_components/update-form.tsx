
"use client";

import React from "react";
import { Button } from "@/app/_components/button";
import { TextInput } from "@/app/_components/form-input";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { AddBrand, ShowBrand } from "../_types/brand.interface";
import SelectBoxInput from "@/app/_components/form-input/selectbox-input/selectbox-input";
import { useUpdateBrand } from "../_api/update-brand";
import { TextPlaceholder } from "@/app/_components/placeholders";

type UpdateFormProps = ShowBrand & {
  isLoading: boolean;
};


const UpdateForm: React.FC<UpdateFormProps> = ({
  data,
  isLoading,
}: UpdateFormProps) => {
  const router = useRouter();

  const params = useParams();
  const id = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : parseInt(params.id);


  const name = data?.name || "";
  const slug = data?.slug || "";
  const is_active = data?.is_active || "";
  console.log(is_active);

  const options = [
    { value: 1, label: "فعال" },
    { value: 0, label: "غیر فعال" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBrand>();

  const { mutate: updateBrand } = useUpdateBrand();

  const onSubmit = (data: any) => {
    updateBrand(
      { id, data },
      {
        onSuccess: () => {
          router.push("../");
        },
      }
    );
  };

  return (
    <>
      {isLoading && data ? (
        <TextPlaceholder />
      ) : (
        <form className="mt-[18px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <TextInput
              rules={{ required: "فیلد نام الزامی است" }}
              errors={errors}
              label={"نام"}
              register={register}
              defaultValue={name}
              name={"name"}
            />

            <TextInput
              rules={{ required: "فیلد نام الزامی است" }}
              errors={errors}
              label={"اسلاگ"}
              register={register}
              defaultValue={slug}
              name={"slug"}
            />

            <SelectBoxInput
              options={options}
              rules={{ required: "فیلد وضعیت الزامی است" }}
              errors={errors}
              label={"وضعیت"}
              register={register}
              defaultValue={is_active ? 1 : 0}
              name={"is_active"}
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              variant="charcoal"
              size="large"
              isLoading={isLoading}
            >
              ایجاد محصول
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateForm;

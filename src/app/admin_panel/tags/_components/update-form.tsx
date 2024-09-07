"use client";

import React from "react";
import { Button } from "@/app/_components/button";
import { TextInput } from "@/app/_components/form-input";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { AddTag, ShowTag } from "../_types/tag.interface";
import SelectBoxInput from "@/app/_components/form-input/selectbox-input/selectbox-input";
import { useUpdateTag } from "../_api/update-tag";
import { TextPlaceholder } from "@/app/_components/placeholders";

type UpdateFormProps = ShowTag & {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTag>();

  const { mutate: updateTag } = useUpdateTag();

  const onSubmit = (data: any) => {
    updateTag(
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
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              variant="charcoal"
              size="large"
              isLoading={isLoading}
            >
              ایجاد تگ
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateForm;

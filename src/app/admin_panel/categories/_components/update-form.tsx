"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/app/_components/button";
import { FileInput, TextInput } from "@/app/_components/form-input";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import {
  AddCategory,
  Options,
  ShowCategory,
} from "../_types/category.interface";
import SelectBoxInput from "@/app/_components/form-input/selectbox-input/selectbox-input";
import { useUpdateCategory } from "../_api/update-category";
import { TextPlaceholder } from "@/app/_components/placeholders";
import { useItemCreateCategory } from "../_api/items-create-category";
import MultiSelectBox from "@/app/_components/multi-selectbox/multi-selectbox";
import TextareaInput from "@/app/_components/form-input/textarea-input/textarea-input";
import Image from "next/image";

type UpdateFormProps = ShowCategory & {
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
  const description = data?.description || "";
  const image = data?.image || "";
  const parent_id = data?.parent_id || "";
  const attributes = data?.attributes || "";
  const attributes_is_filter = data?.attributes_is_filter || "";
  const attributes_is_variation = data?.attributes_is_variation || "";

  const {
    data: itemCreateCategory,
    isFetching,
    error,
    refetch,
  } = useItemCreateCategory();

  const AttributeList: Options[] =
    itemCreateCategory?.data &&
    Array.isArray(itemCreateCategory?.data.attributes)
      ? itemCreateCategory.data.attributes
      : [];

  const CategoryList: Options[] =
    itemCreateCategory?.data &&
    Array.isArray(itemCreateCategory.data.categories)
      ? itemCreateCategory.data.categories
      : [];

  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [attribute_isfilter, setَAttributes_isfilter] = useState<any>([]);
  const [selectedattribute_isfilter, setَSetSelectedAttributes_isfilter] =
    useState<any>([]);
  const [attribute_variation, setَAttributes_variation] = useState<any>([]);
  const [isReady, setIsReady] = useState<any>(Boolean);

  useEffect(() => {
    setSelectedOptions(attributes);
    setَAttributes_isfilter(attributes);
    setَSetSelectedAttributes_isfilter(attributes_is_filter);
    setَAttributes_variation(attributes);
  }, [AttributeList, attributes]);

  useEffect(() => {
    if (!isLoading && !isFetching && !!data) {
      setIsReady(true);
    }
  }, [isLoading, isFetching]);

  const handleChangeAttribute = (selected: unknown[]) => {
    setSelectedOptions(selected);
    setَAttributes_isfilter(selected);
    setَSetSelectedAttributes_isfilter(selected);
    setَAttributes_variation(selected);

    console.log(selectedOptions);
  };
  const handleChangeAttribute_isfilter = (selected: unknown[]) => {
    setَSetSelectedAttributes_isfilter(selected);

    console.log(selectedOptions);
  };

  const options = [
    { value: 1, label: "فعال" },
    { value: 0, label: "غیر فعال" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategory>();

  const { mutate: updateCategory } = useUpdateCategory();

  const onSubmit = (data: AddCategory) => {
    const attribute_ids = selectedOptions.map((val: any) => val.value);
    const attribute_is_filter_ids = selectedattribute_isfilter.map(
      (val: any) => val.value
    );

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("is_active", String(data.is_active));
    formData.append("description", data.description);
    formData.append("parent_id", String(data.parent_id ? data.parent_id : 0));
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }
    attribute_ids.forEach((id: any) =>
      formData.append("attribute_ids[]", String(id))
    );
    attribute_is_filter_ids.forEach((id: any) =>
      formData.append("attribute_is_filter_ids[]", String(id))
    );
    formData.append("variation_id", String(data.variation_id));

    updateCategory(
      { id, formData },
      {
        onSuccess: () => {
          router.push("../");
        },
      }
    );
  };

  return (
    <>
      {!isReady || isFetching || isLoading ? (
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
              rules={{ required: "فیلد نام انگلیسی الزامی است" }}
              errors={errors}
              label={"نام انگلیسی"}
              register={register}
              defaultValue={slug}
              name={"slug"}
            />

            <FileInput
              errors={errors}
              label="عکس دسته"
              register={register}
              name="image"
            />

            <SelectBoxInput
              options={options}
              errors={errors}
              label="وضعیت"
              register={register}
              defaultValue={is_active ? 1 : 0}
              name="is_active"
            />
            <SelectBoxInput
              options={CategoryList}
              errors={errors}
              label="دسته والد"
              register={register}
              defaultValue={parent_id}
              name="parent_id"
            />

            <MultiSelectBox
              options={AttributeList}
              onChange={handleChangeAttribute}
              value={selectedOptions}
              label="ویژگی های دسته"
            />
            <MultiSelectBox
              options={attribute_isfilter}
              onChange={handleChangeAttribute_isfilter}
              value={selectedattribute_isfilter}
              label="ویژگی قابل فیلتر"
            />
            <SelectBoxInput
              options={attribute_variation}
              defaultValue={attributes_is_variation}
              rules={{ required: "فیلد وضعیت الزامی است" }}
              errors={errors}
              label="ویزگی متغیر"
              register={register}
              name="variation_id"
            />
          </div>

          <div className="mt-7">
            <TextareaInput
              rules={{ required: "فیلد نام الزامی است" }}
              errors={errors}
              label="توضیحات"
              register={register}
              defaultValue={description}
              name="description"
            />
          </div>

          <div className="flex justify-center mt-5">
            <Image src={image} width={200} height={200} alt="" />
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

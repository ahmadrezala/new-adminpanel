"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/button";
import { FileInput, TextInput } from "@/app/_components/form-input";
import SelectBoxInput from "@/app/_components/form-input/selectbox-input/selectbox-input";
import { useAddCategory } from "../_api/add-category";
import { AddCategory, Options } from "../_types/category.interface";
import TextareaInput from "@/app/_components/form-input/textarea-input/textarea-input";
import MultiSelectBox from "@/app/_components/multi-selectbox/multi-selectbox";
import { useItemCreateCategory } from "../_api/items-create-category";

const CreateForm: React.FC = () => {
  const router = useRouter();

  const { data, isFetching, error, refetch } = useItemCreateCategory();


  const AttributeList: Options[] =
    data?.data && Array.isArray(data.data.attributes)
      ? data.data.attributes
      : [];

  const CategoryList: Options[] =
    data?.data && Array.isArray(data.data.categories)
      ? data.data.categories
      : [];

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [attribute_isfilter, setَAttributes_isfilter] = useState<any[]>([]);
  const [selectedattribute_isfilter, setَSetSelectedAttributes_isfilter] =
    useState<any[]>([]);
  const [attribute_variation, setَAttributes_variation] = useState<any[]>([]);

  const handleChangeAttribute = (selected: unknown[]) => {
    setSelectedOptions(selected);
    setَAttributes_isfilter(selected);
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

  const addCategory = useAddCategory({
    onSuccess: () => {
      router.push("./");
    },
  });

  const onSubmit = (data: AddCategory) => {
    
    const attribute_ids = selectedOptions.map((val) => val.value);
    const attribute_is_filter_ids = selectedattribute_isfilter.map(
      (val) => val.value
    );

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("is_active", String(data.is_active));
    formData.append("description", data.description);
    formData.append("parent_id", String(data.parent_id ? data.parent_id: 0));
    formData.append("image", data.image[0]);
    attribute_ids.forEach((id) =>
      formData.append("attribute_ids[]", String(id))
    );
    attribute_is_filter_ids.forEach((id) =>
      formData.append("attribute_is_filter_ids[]", String(id))
    );
    formData.append("variation_id", String(data.variation_id));
    console.log(formData);
    addCategory.mutate(formData);
  };

  return (
    <form className="mt-[18px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-7">
        <TextInput
          rules={{ required: "فیلد نام الزامی است" }}
          errors={errors}
          label="نام"
          register={register}
          name="name"
        />

        <TextInput
          rules={{ required: "فیلد نام الزامی است" }}
          errors={errors}
          label="اسلاگ"
          register={register}
          name="slug"
        />

        <FileInput
          rules={{ required: "فیلد نام الزامی است" }}
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
          name="is_active"
        />
        <SelectBoxInput
          options={CategoryList}
          errors={errors}
          label="دسته والد"
          register={register}
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
          name="description"
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="charcoal"
          size="large"
          isLoading={addCategory.isLoading}
        >
          ایجاد محصول
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/button";
import { FileInput, TextInput } from "@/app/_components/form-input";
import SelectBoxInput from "@/app/_components/form-input/selectbox-input/selectbox-input";
import { useAddProduct } from "../_api/add-product";
import { AddProduct, Options } from "../_types/product.interface";
import TextareaInput from "@/app/_components/form-input/textarea-input/textarea-input";
import MultiSelectBox from "@/app/_components/multi-selectbox/multi-selectbox";
import { useItemCreateProduct } from "../_api/items-create-product";
import { useAttributesCategory } from "../_api/get-attributes-category";
import DynamicInputForm from "./dynamic-Input-form";

const CreateForm: React.FC = () => {
  const router = useRouter();

  const { data, isFetching, error, refetch } = useItemCreateProduct();

  const BrandList: Options[] =
    data?.data && Array.isArray(data.data.brands) ? data.data.brands : [];
  const TagList: Options[] =
    data?.data && Array.isArray(data.data.tags) ? data.data.tags : [];

  const CategoryList: Options[] =
    data?.data && Array.isArray(data.data.categories)
      ? data.data.categories
      : [];

  const [selectedTag_ids, setَSetSelectedTag_ids] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const handleChangeTag_ids = (selected: unknown[]) => {
    setَSetSelectedTag_ids(selected);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    setCategoryId(value);
  };

  const { data: attributes } = useAttributesCategory({ id: categoryId });
 
  const AttributesCategory: Options[] =
    data?.data && Array.isArray(attributes?.data?.attributes)
      ? attributes?.data?.attributes
      : [];
  const AttributesVariationCategory: number | undefined =
    data?.data && attributes?.data?.attributes_is_variation;

  const options = [
    { value: 1, label: "فعال" },
    { value: 0, label: "غیر فعال" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProduct>();

  const addProduct = useAddProduct({
    onSuccess: () => {
      router.push("./");
    },
  });

  const onSubmit = (data: AddProduct) => {
    console.log(data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("is_active", String(data.is_active));
    formData.append("delivery_amount", String(data.delivery_amount));
    formData.append(
      "delivery_amount_per_product",
      String(data.delivery_amount_per_product)
    );
    formData.append("description", data.description);
    formData.append("category_id", String(data.category_id));
    formData.append("brand_id", String(data.brand_id));
    if (data.primary_image[0]) {
      formData.append("primary_image", data.primary_image[0]);
    }

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }
    data.attribute_ids.forEach((attr: string | number, index: number) => {
      formData.append(`attribute_ids[${index}]`, String(attr));
    });

    selectedTag_ids.forEach((attr, index) => {
      formData.append(`tag_ids[${index}]`, attr.value);
    });

    const variationKeys = Object.keys(data.variation_values);
    const firstKey = variationKeys[0];
    const itemKeys = Object.keys(data.variation_values[firstKey]);

    itemKeys.forEach((itemKey, index) => {
      variationKeys.forEach((variationKey) => {
        let value: any = data.variation_values[variationKey][itemKey];

        // Convert value to string if it's a number
        if (typeof value === "number") {
          value = String(value);
        } else if (typeof value !== "string") {
          // Handle edge cases where value is neither string nor number
          console.warn(`Unexpected value type found: ${typeof value}`);
          return; // Skip appending this value if it's not string or number
        }

        formData.append(`variation_values[${variationKey}][${index}]`, value);
      });
    });

    console.log(formData);
    addProduct.mutate(formData);
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
          rules={{ required: "فیلد  عکس اصلی الزامی است" }}
          errors={errors}
          label="عکس اصلی"
          register={register}
          name="primary_image"
        />
        <FileInput
          rules={{ required: "فیلد تصاویر الزامی است" }}
          errors={errors}
          label="تصاویر"
          register={register}
          name="images"
          multiple
        />

        <SelectBoxInput
          options={options}
          errors={errors}
          label="وضعیت"
          register={register}
          name="is_active"
        />

        <SelectBoxInput
          options={BrandList}
          errors={errors}
          label="برند"
          register={register}
          name="brand_id"
        />

        <MultiSelectBox
          options={TagList}
          onChange={handleChangeTag_ids}
          value={selectedTag_ids}
          label="تگ ها"
        />

        <TextInput
          rules={{ required: "فیلد هزینه ارسال الزامی است" }}
          errors={errors}
          label="هزینه ارسال"
          register={register}
          name="delivery_amount"
        />
        <TextInput
          rules={{ required: "فیلد  هزینه ارسال ازای محصول الزامی است" }}
          errors={errors}
          label="هزینه ارسال ازای محصول"
          register={register}
          name="delivery_amount_per_product"
        />
      </div>
      <div className="grid border-t-[1px] border-t-solid border-t-charcoal mt-7 pt-7 grid-cols-2 gap-7">
        <span>دسته بندی و ویژگی ها</span>
        <SelectBoxInput
          options={CategoryList}
          errors={errors}
          label="دسته"
          onChange={(e) => handleChangeCategory(e)}
          register={register}
          name="category_id"
        />

        {AttributesCategory &&
          AttributesCategory.map((att) => (
            <TextInput
              rules={{ required: "فیلد نام الزامی است" }}
              errors={errors}
              label={att.label}
              register={register}
              name={`attribute_ids.${att.value}` as `attribute_ids.${number}`}
            />
          ))}
      </div>

      <DynamicInputForm
        errors={errors}
        register={register}
        AttributesVariationCategory={AttributesVariationCategory}
      />

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
          isLoading={addProduct.isLoading}
        >
          ایجاد محصول
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;

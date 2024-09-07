"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/app/_components/button";
import { TextInput } from "@/app/_components/form-input";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import SelectBoxInput from "@/app/_components/form-input/selectbox-input/selectbox-input";

import { TextPlaceholder } from "@/app/_components/placeholders";
import { useAttributesCategory } from "../_api/get-attributes-category";
import { useUpdateProductCategory } from "../_api/update-product-category";
import { useCategories } from "../_api/get-categories";
import { Options, ShowProductCategory, UpdateProductCategory } from "../_types/product.interface";
import DynamicInputForm from "./dynamic-Input-form";

type UpdateFormProps = ShowProductCategory & {
  isLoading: boolean;
};

const UpdateFormProductCategory: React.FC<UpdateFormProps> = ({
  data,
  isLoading,
}: UpdateFormProps) => {
  const router = useRouter();

  const params = useParams();
  const id = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : parseInt(params.id);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [selectedCategoryName, setَselectedCategoryName] = useState<any>();


  const { data: CategoryList, isFetching } = useCategories();
  console.log(CategoryList);

  const Categorylist: Options[] =
  CategoryList?.data && Array.isArray(CategoryList?.data)
    ? CategoryList?.data
    : [];
  

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = Array.isArray(CategoryList?.data) && CategoryList?.data.find(
      (option: any) => option.value == e.target.value
    );

    setَselectedCategoryName(selectedOption?.label);
    const value = e.target.value ? parseInt(e.target.value) : null;
    setCategoryId(value);
  };

  const { data: attributes } = useAttributesCategory({ id: categoryId });

  const [isReady, setIsReady] = useState<any>(Boolean);

  useEffect(() => {
    if (!isLoading && !isFetching && !!data) {
      setIsReady(true);
    }
  }, [isLoading, isFetching]);

  const category = data?.category || "";
  console.log(category);





  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProductCategory>();

  const { mutate: updateProductCategory } = useUpdateProductCategory(selectedCategoryName);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("category_id", String(data.category_id));

    data.attribute_ids.forEach((attr: string | number, index: number) => {
      formData.append(`attribute_ids[${index}]`, String(attr));
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

    updateProductCategory(
      { id, formData },
      {
        onSuccess: () => {
          router.push("../../");
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
            <span>دسته بندی و ویژگی ها</span>
            <SelectBoxInput
              options={Categorylist}
              errors={errors}
              label="دسته"
              defaultValue={category}
              onChange={(e) => handleChangeCategory(e)}
              register={register}
              name="category_id"
            />

            {attributes?.data?.attributes &&
              attributes?.data?.attributes.map((att) => (
                <TextInput
                  rules={{ required: "فیلد نام الزامی است" }}
                  errors={errors}
                  label={att.label}
                  register={register}
                  name={
                    `attribute_ids.${att.value}` as `attribute_ids.${number}`
                  }
                />
              ))}
          </div>
          <DynamicInputForm
            errors={errors}
            register={register}
            AttributesVariationCategory={
              attributes?.data?.attributes_is_variation
            }
          />

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

export default UpdateFormProductCategory;

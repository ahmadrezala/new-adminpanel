"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/app/_components/button";
import { FileInput, TextInput } from "@/app/_components/form-input";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import {
  AddProduct,
  Options,
  ShowProduct,
  UpdateProduct,
} from "../_types/product.interface";
import SelectBoxInput from "@/app/_components/form-input/selectbox-input/selectbox-input";
import { TextPlaceholder } from "@/app/_components/placeholders";
import { useItemCreateProduct } from "../_api/items-create-product";
import MultiSelectBox from "@/app/_components/multi-selectbox/multi-selectbox";
import TextareaInput from "@/app/_components/form-input/textarea-input/textarea-input";
import { useUpdateProduct } from "../_api/update-product";
import Datebox from "@/app/_components/datebox/datebox";
import DateInput from "@/app/_components/form-input/date-input/date-input";

type UpdateFormProps = ShowProduct & {
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

  const {
    data: itemCreateProduct,
    isFetching,
    error,
    refetch,
  } = useItemCreateProduct();

  const BrandList: Options[] =
    itemCreateProduct?.data && Array.isArray(itemCreateProduct.data.brands)
      ? itemCreateProduct.data.brands
      : [];
  const TagList: Options[] =
    itemCreateProduct?.data && Array.isArray(itemCreateProduct.data.tags)
      ? itemCreateProduct.data.tags
      : [];

  const name = data?.name || "";
  const slug = data?.slug || "";
  const is_active = data?.is_active || "";
  const description = data?.description || "";
  const tags = data?.tags || "";
  const brand = data?.brand || "";
  const delivery_amount = data?.delivery_amount || "";
  const delivery_amount_per_product = data?.delivery_amount_per_product || "";
  const attributes = data?.attributes || "";
  const variations = data?.variations || "";

  const [selectedTag_ids, setَSelectedTag_ids] = useState<any>([]);
  const [selectedBrandName, setَselectedBrandName] = useState<any>();

  const handleChangeTag_ids = (selected: unknown[]) => {
    setَSelectedTag_ids(selected);
  };

  const handelSelectedBrand = (e: any) => {
    const selectedOption = BrandList.find(
      (option) => option.value == e.target.value
    );

    setَselectedBrandName(selectedOption?.label);
  };

  const [isReady, setIsReady] = useState<any>(Boolean);

  useEffect(() => {
    setَSelectedTag_ids(tags);
  }, [TagList, tags]);

  useEffect(() => {
    if (!isLoading && !isFetching && !!data) {
      setIsReady(true);
    }
  }, [isLoading, isFetching]);

  const options = [
    { value: 1, label: "فعال" },
    { value: 0, label: "غیر فعال" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProduct>();

  const { mutate: updateProduct } = useUpdateProduct(selectedBrandName);

  const onSubmit = (data: UpdateProduct) => {
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

    formData.append("brand_id", String(data.brand_id));

    data.attribute_ids.forEach((attr: string | number, index: number) => {
      formData.append(`attribute_ids[${index}]`, String(attr));
    });

    selectedTag_ids.forEach((attr: any, index: number) => {
      formData.append(`tag_ids[${index}]`, attr.value);
    });

    const variationKeys = Object.keys(
      data.variation_values
    ) as unknown as number[];
    variationKeys.forEach((variationKey) => {
      const variation = data.variation_values[variationKey];
      const itemKeys = Object.keys(variation) as (keyof typeof variation)[];

      itemKeys.forEach((itemKey) => {
        let value: any = variation[itemKey];

        if (typeof value === "number") {
          value = String(value);
        } else if (typeof value !== "string") {
          console.warn(`Unexpected value type found: ${typeof value}`);
          return;
        }

        formData.append(`variation_values[${variationKey}][${itemKey}]`, value);
      });
    });

    updateProduct(
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

            <SelectBoxInput
              options={options}
              errors={errors}
              label="وضعیت"
              register={register}
              defaultValue={is_active ? 1 : 0}
              name="is_active"
            />

            <SelectBoxInput
              options={BrandList}
              errors={errors}
              label="برند"
              defaultValue={brand}
              register={register}
              name="brand_id"
              onChange={(e) => handelSelectedBrand(e)}
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
              defaultValue={delivery_amount}
              name="delivery_amount"
            />
            <TextInput
              rules={{ required: "فیلد  هزینه ارسال ازای محصول الزامی است" }}
              errors={errors}
              label="هزینه ارسال ازای محصول"
              register={register}
              defaultValue={delivery_amount_per_product}
              name="delivery_amount_per_product"
            />
          </div>

          <div className="py-7 my-7 border-y-[1px] border-y-solid border-y-charcoal">
            <div className="mb-7">ویژگی ها</div>
            <div className="grid grid-cols-2 gap-5 ">
              {attributes &&
                attributes.map((att: any) => (
                  <TextInput
                    rules={{ required: "فیلد نام الزامی است" }}
                    errors={errors}
                    label={att.label}
                    register={register}
                    defaultValue={att.value}
                    name={
                      `attribute_ids.${att.id}` as `attribute_ids.${number}`
                    }
                  />
                ))}
            </div>
          </div>

          <div>
            {variations &&
              variations.map((att: any) => (
                <div className="my-7">
                  <div>قیمت و موجودی برای متغیر:{att.value}</div>
                  <div className="grid grid-cols-2 gap-5 mt-7">
                    <TextInput
                      rules={{ required: "فیلد نام الزامی است" }}
                      errors={errors}
                      label={"قیمت"}
                      register={register}
                      defaultValue={att.price}
                      name={`variation_values[${att.id}][price]`}
                    />
                    <TextInput
                      rules={{ required: "فیلد نام الزامی است" }}
                      errors={errors}
                      label={"تعداد"}
                      register={register}
                      defaultValue={att.quantity}
                      name={`variation_values[${att.id}][quantity]`}
                    />
                    <TextInput
                      rules={{ required: "فیلد نام الزامی است" }}
                      errors={errors}
                      label={"شناسه انبار"}
                      register={register}
                      defaultValue={att.sku}
                      name={`variation_values[${att.id}][sku]`}
                    />
                    <TextInput
                      errors={errors}
                      label={"قیمت حراجی"}
                      register={register}
                      defaultValue={att.sale_price}
                      name={`variation_values[${att.id}][sale_price]`}
                    />
                    <DateInput
                      errors={errors}
                      label={"تاریخ شروع حراجی"}
                      register={register}
                      defaultValue={new Date(att.date_on_sale_from)
                        .toISOString()
                        .substr(0, 10)}
                      name={`variation_values[${att.id}][date_on_sale_from]`}
                    />
                    <DateInput
                      errors={errors}
                      label={"تاریخ پایان حراجی"}
                      register={register}
                      defaultValue={new Date(att.date_on_sale_to)
                        .toISOString()
                        .substr(0, 10)}
                      name={`variation_values[${att.id}][date_on_sale_to]`}
                    />
                  </div>
                </div>
              ))}
            <TextareaInput
              rules={{ required: "فیلد نام الزامی است" }}
              errors={errors}
              label="توضیحات"
              register={register}
              defaultValue={description}
              name="description"
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

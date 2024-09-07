"use client";

import React from "react";
import { Button } from "@/app/_components/button";
import { FileInput } from "@/app/_components/form-input";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { TextPlaceholder } from "@/app/_components/placeholders";
import {
  Image as ProductImage,
  ShowProductImages,
  UpdateProductImage,
} from "../_types/product.interface";
import { useUpdateProductImages } from "../_api/update-product-images";
import Image from "next/image";

type UpdateFormProps = ShowProductImages & {
  isLoading: boolean;
  onDeleteClick: (image: ProductImage) => void;
};

const UpdateFormProductImages: React.FC<UpdateFormProps> = ({
  data,
  isLoading,
  onDeleteClick,
}: UpdateFormProps) => {
  const router = useRouter();

  const params = useParams();
  const id = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : parseInt(params.id);

  const primary_image = data?.primary_image || "";
  const images = data?.images || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProductImage>();

  const { mutate: updateProductImages } = useUpdateProductImages();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    if (data.primary_image[0]) {
      formData.append("primary_image", data.primary_image[0]);
    }

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file: any, index: number) => {
        formData.append(`images[${index}]`, file);
      });
    }
    updateProductImages(
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
      {isLoading ? (
        <TextPlaceholder />
      ) : (
        <form className="mt-[18px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="py-7 my-7 border-b-[1px] border-b-solid border-b-charcoal">
            <span>تصویر اصلی</span>
            <div className="w-full flex justify-center mt-7">
              <Image src={primary_image} width={300} height={300} alt="" />
            </div>
          </div>
          <div className="py-7 my-7 border-b-[1px] border-b-solid border-b-charcoal">
            <span>تصاویر</span>
            <div className="w-full flex mt-7  flex-wrap justify-center gap-6">
              {images &&
                images.map((image: ProductImage) => (
                  <div className="flex flex-col w-[200px] h-auto  bg-white relative">
                    <div className="relative w-[200px] h-[200px]">
                      <Image src={image.image} style={{ objectFit: "cover" }} fill alt="" />
                    </div>
                    <div className="flex justify-center my-2">
                      <Button
                        variant="error"
                        size="small"
                        isLoading={isLoading}
                        onClick={() => onDeleteClick(image)}
                      >
                        حذف تصویر
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <FileInput        
              errors={errors}
              label="عکس اصلی"
              register={register}
              name="primary_image"
            />
            <FileInput
              errors={errors}
              label="تصاویر"
              register={register}
              name="images"
              multiple
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

export default UpdateFormProductImages;

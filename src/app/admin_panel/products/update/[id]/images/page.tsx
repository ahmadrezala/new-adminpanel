"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useShowProductImages } from "../../../_api/show-product-images";
import UpdateFormProductImages from "../../../_components/update-form-product-images";
import ConfirmDialog from "@/app/_components/confirm-dialog/confirm-dialog";
import { Image, Product } from "../../../_types/product.interface";
import { useDeleteProductImages } from "../../../_api/delete-product-images";

export default function UpdateCategory() {
  const params = useParams();
  const id = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : parseInt(params.id);

  console.log(id);

  const { mutate: deleteProductImage, isLoading: isDeleting } = useDeleteProductImages();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
   
  } | null>(null);

  const handleDeleteClick = (image: Image) => {
    setSelectedProduct({ id: image.id });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteProductImage({ id: selectedProduct.id });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const { data: ProductImages, isFetching } = useShowProductImages({ id });

  return (
    <section className="flex justify-center mt-[60px]">
      <div className="p-[36px] border-[1px] border-solid h-auto border-charcoal bg-dark-navy rounded-3xl w-[70%]">
        <div className="text-white text-[20px] pb-[20px] border-b-[1px] border-solid border-charcoal">
          تغییر برند
        </div>
        <UpdateFormProductImages
          data={ProductImages?.data}
          isLoading={isFetching}
          onDeleteClick={handleDeleteClick}
        />
        <ConfirmDialog
          isOpen={isDialogOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDialog}
          message={`آیا مطمئن هستید میخواهید این عکس را حذف کنید`}
        />
      </div>
    </section>
  );
}

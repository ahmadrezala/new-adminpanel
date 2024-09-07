import React, { useState } from "react";

import { TextPlaceholder } from "@/app/_components/placeholders";

import ConfirmDialog from "@/app/_components/confirm-dialog/confirm-dialog";
import { Product } from "../_types/product.interface";
import { useDeleteProduct } from "../_api/delete-product";
import ProductTable from "./product-table";



type ProductListProps = {
  products: Product[];
  isLoading: boolean;
};

const ProductList: React.FC<ProductListProps> = ({ products, isLoading }) => {
  const { mutate: deleteProduct, isLoading: isDeleting } = useDeleteProduct();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (Product: Product) => {
    setSelectedProduct({ id: Product.id, name: Product.name });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteProduct({ id: selectedProduct.id });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {isLoading ? (
        <TextPlaceholder />
      ) : (
        <ProductTable products={products} onDeleteClick={handleDeleteClick} />
      )}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDialog}
        message={`آیا مطمئن هستید که می‌خواهید برند ${selectedProduct?.name} را حذف کنید؟`}
      />
    </>
  );
};

export default ProductList;

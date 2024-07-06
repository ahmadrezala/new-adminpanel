import React, { useState } from "react";
import { Brand } from "../_types/brand.interface";
import { TextPlaceholder } from "@/app/_components/placeholders";
import { useDeleteBrand } from "../_api/delete-brand";
import ConfirmDialog from "@/app/_components/confirm-dialog/confirm-dialog";
import BrandTable from "./brand-table";


type BrandListProps = {
  brands: Brand[];
  isLoading: boolean;
};

const BrandList: React.FC<BrandListProps> = ({ brands, isLoading }) => {
  const { mutate: deleteBrand, isLoading: isDeleting } = useDeleteBrand();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<{ id: number; name: string } | null>(null);

  const handleDeleteClick = (brand: Brand) => {
    setSelectedBrand({ id: brand.id, name: brand.name });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBrand) {
      deleteBrand({ id: selectedBrand.id });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedBrand(null);
  };

  return (
    <>
      {isLoading ? <TextPlaceholder /> : <BrandTable brands={brands} onDeleteClick={handleDeleteClick} />}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDialog}
        message={`آیا مطمئن هستید که می‌خواهید برند ${selectedBrand?.name} را حذف کنید؟`}
      />
    </>
  );
};

export default BrandList;

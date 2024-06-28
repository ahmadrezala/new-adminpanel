import React, { useState } from "react";
import { Brand } from "../_types/brand.interface";
import { IconPen, IconTrash } from "@/app/_components/icons/icons";
import { TextPlaceholder } from "@/app/_components/placeholders";
import { useDeleteBrand } from "../_api/delete-brand";
import ConfirmDialog from "@/app/_components/confirm-dialog/confirm-dialog";
import Link from "next/link";

type BrandListProps = {
  brands: Brand[];
  isLoading: boolean;
};

export default function BrandList({ brands, isLoading }: BrandListProps) {
  const { mutate, isLoading: isDeleting } = useDeleteBrand();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedBrandName, setSelectedBrandName] = useState<string>("");

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedBrandId(id);
    setSelectedBrandName(name);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBrandId !== null) {
      mutate({ id: selectedBrandId });
    }
    setIsDialogOpen(false);
    setSelectedBrandId(null);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
    setSelectedBrandId(null);
  };

  return (
    <>
      {isLoading ? (
        <TextPlaceholder />
      ) : (
        <table className="table mt-[20px]">
          <thead>
            <tr>
              <th>نام</th>
              <th>اسلاگ</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.name}</td>
                <td>{brand.slug}</td>
                <td>
                  <div className="flex gap-4">
                    <IconTrash
                      width={18}
                      height={18}
                      onClick={() => handleDeleteClick(brand.id, brand.name)}
                    />
                    <Link href={`brands/update/${brand.id}`}>
                      <IconPen width={18} height={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={`آیا مطمئن هستید که می‌خواهید برند ${selectedBrandName} را حذف کنید؟`}
      />
    </>
  );
}

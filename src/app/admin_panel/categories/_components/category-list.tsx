import React, { useState } from "react";
import { Category } from "../_types/category.interface";
import { TextPlaceholder } from "@/app/_components/placeholders";
import { useDeleteCategory } from "../_api/delete-category";
import ConfirmDialog from "@/app/_components/confirm-dialog/confirm-dialog";
import CategoryTable from "./category-table";


type CategoryListProps = {
  categories: Category[];
  isLoading: boolean;
};

const CategoryList: React.FC<CategoryListProps> = ({ categories, isLoading }) => {
  const { mutate: deleteCategory, isLoading: isDeleting } = useDeleteCategory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (Category: Category) => {
    setSelectedCategory({ id: Category.id, name: Category.name });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteCategory({ id: selectedCategory.id });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      {isLoading ? (
        <TextPlaceholder />
      ) : (
        <CategoryTable categories={categories} onDeleteClick={handleDeleteClick} />
      )}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDialog}
        message={`آیا مطمئن هستید که می‌خواهید برند ${selectedCategory?.name} را حذف کنید؟`}
      />
    </>
  );
};

export default CategoryList;

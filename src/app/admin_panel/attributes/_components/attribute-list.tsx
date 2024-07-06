import React, { useState } from "react";
import { TextPlaceholder } from "@/app/_components/placeholders";
import ConfirmDialog from "@/app/_components/confirm-dialog/confirm-dialog";
import AttributeTable from "./attribute-table";
import { Attribute } from "../_types/attribute.interface";
import { useDeleteAttribute } from "../_api/delete-attribute";

type AttributeListProps = {
  attributes: Attribute[];
  isLoading: boolean;
};

const AttributeList: React.FC<AttributeListProps> = ({
  attributes,
  isLoading,
}) => {
  const { mutate: deleteAttribute, isLoading: isDeleting } =
    useDeleteAttribute();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (attribute: Attribute) => {
    setSelectedAttribute({ id: attribute.id, name: attribute.name });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAttribute) {
      deleteAttribute({ id: selectedAttribute.id });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedAttribute(null);
  };

  return (
    <>
      {isLoading ? (
        <TextPlaceholder />
      ) : (
        <AttributeTable
          attributes={attributes}
          onDeleteClick={handleDeleteClick}
        />
      )}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDialog}
        message={`آیا مطمئن هستید که می‌خواهید برند ${selectedAttribute?.name} را حذف کنید؟`}
      />
    </>
  );
};

export default AttributeList;

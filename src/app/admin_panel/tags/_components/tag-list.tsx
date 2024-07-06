import React, { useState } from "react";
import { Tag } from "../_types/tag.interface";
import { TextPlaceholder } from "@/app/_components/placeholders";
import { useDeleteTag } from "../_api/delete-tag";
import ConfirmDialog from "@/app/_components/confirm-dialog/confirm-dialog";
import TagTable from "./tag-table";


type TagListProps = {
  tags: Tag[];
  isLoading: boolean;
};

const TagList: React.FC<TagListProps> = ({ tags, isLoading }) => {
  const { mutate: deleteTag, isLoading: isDeleting } = useDeleteTag();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (tag: Tag) => {
    setSelectedTag({ id: tag.id, name: tag.name });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTag) {
      deleteTag({ id: selectedTag.id });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTag(null);
  };

  return (
    <>
      {isLoading ? (
        <TextPlaceholder />
      ) : (
        <TagTable tags={tags} onDeleteClick={handleDeleteClick} />
      )}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDialog}
        message={`آیا مطمئن هستید که می‌خواهید برند ${selectedTag?.name} را حذف کنید؟`}
      />
    </>
  );
};

export default TagList;

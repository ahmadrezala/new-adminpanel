import React from "react";
import { Tag } from "../_types/tag.interface";
import { IconPen, IconTrash } from "@/app/_components/icons/icons";
import Link from "next/link";

type TagTableProps = {
  tags: Tag[];
  onDeleteClick: (Tag: Tag) => void;
};

const TagTable: React.FC<TagTableProps> = ({ tags, onDeleteClick }) => (
  <table className="table mt-[20px]">
    <thead>
      <tr>
        <th>نام</th>
        <th>عملیات</th>
      </tr>
    </thead>
    <tbody>
      {tags.map((tag) => (
        <tr key={tag.id}>
          <td>{tag.name}</td>
          <td>
            <div className="flex gap-4">
              <IconTrash
                width={18}
                height={18}
                onClick={() => onDeleteClick(tag)}
              />
              <Link href={`tags/update/${tag.id}`}>
                <IconPen width={18} height={18} />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TagTable;

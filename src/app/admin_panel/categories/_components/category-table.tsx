import React from "react";
import { Category } from "../_types/category.interface";
import { IconPen, IconTrash } from "@/app/_components/icons/icons";
import Link from "next/link";
import Image from "next/image";
import Badge from "@/app/_components/badge/badge";

type CategoryTableProps = {
  categories: Category[];
  onDeleteClick: (Category: Category) => void;
};

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onDeleteClick,
}) => (
  <table className="table mt-[20px]">
    <thead>
      <tr>
        <th>عکس</th>
        <th>نام</th>
        <th>نام انگلیسی</th>
        <th>وضعیت</th>
        <th>عملیات</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((category) => (
        <tr key={category.id}>
          <td>
            <Image
              src={category.image}
              style={{ borderRadius: "50px" }}
              width={35}
              height={35}
              alt=""
            />
          </td>
          <td>{category.name}</td>
          <td>{category.slug}</td>
          <td>
            <Badge variant={category.is_active ? 'success' : 'error'} size="tiny">
              {category.is_active ? 'فعال' : 'غیرفعال'}
            </Badge>
          </td>
          <td>
            <div className="flex gap-4">
              <IconTrash
                width={18}
                height={18}
                onClick={() => onDeleteClick(category)}
              />
              <Link href={`categories/update/${category.id}`}>
                <IconPen width={18} height={18} />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CategoryTable;

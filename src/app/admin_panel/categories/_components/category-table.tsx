import React from "react";
import { Category } from "../_types/category.interface";
import { IconPen, IconTrash } from "@/app/_components/icons/icons";
import Link from "next/link";
import Image from "next/image";

type CategoryTableProps = {
  categories: Category[];
  onDeleteClick: (Category: Category) => void;
};

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onDeleteClick }) => (
  <table className="table mt-[20px]">
    <thead>
      <tr>
        <th>عکس</th>
        <th>نام</th>
        <th>نام انگلیسی</th>
        <th>عملیات</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((category) => (
        <tr key={category.id}>
          <td><Image src={category.image} style={{ borderRadius: "50px" }} width={35} height={35} alt=""/></td>
          <td>{category.name}</td>
          <td>{category.slug}</td>
          <td>
            <div className="flex gap-4">
              <IconTrash
                width={18}
                height={18}
                onClick={() => onDeleteClick(category)}
              />
              <Link href={`Categorys/update/${category.id}`}>
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

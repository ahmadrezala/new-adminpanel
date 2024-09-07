import React from "react";
import { Brand } from "../_types/brand.interface";
import { IconPen, IconTrash } from "@/app/_components/icons/icons";
import Link from "next/link";
import Badge from "@/app/_components/badge/badge";

type BrandTableProps = {
  brands: Brand[];
  onDeleteClick: (brand: Brand) => void;
};

const BrandTable: React.FC<BrandTableProps> = ({ brands, onDeleteClick }) => (
  <table className="table mt-[20px]">
    <thead>
      <tr>
        <th>نام</th>
        <th>نام انگلیسی</th>
        <th>وضعیت</th>
        <th>عملیات</th>
      </tr>
    </thead>
    <tbody>
      {brands.map((brand) => (
        <tr key={brand.id}>
          <td>{brand.name}</td>
          <td>{brand.slug}</td>
          <td>
            <Badge variant={brand.is_active ? 'success' : 'error'} size="tiny">
              {brand.is_active ? 'فعال' : 'غیرفعال'}
            </Badge>
          </td>
          <td>
            <div className="flex gap-4">
              <IconTrash width={18} height={18} onClick={() => onDeleteClick(brand)} />
              <Link href={`brands/update/${brand.id}`}>
                <IconPen width={18} height={18} />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BrandTable;

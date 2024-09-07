import React, { useState } from "react";
import { IconPen, IconTrash } from "@/app/_components/icons/icons";
import Image from "next/image";
import Badge from "@/app/_components/badge/badge";
import { Product } from "../_types/product.interface";

import Link from "next/link";
import { DropdownMenu } from "@/app/_components/dropdown-menu";

type productTableProps = {
  products: Product[];
  onDeleteClick: (product: Product) => void;
};

const ProductTable: React.FC<productTableProps> = ({
  products,
  onDeleteClick,
}) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (productId: number) => {
    setOpenMenuId((prev) => (prev === productId ? null : productId));
  };

  return (
    <table className="table mt-[20px]">
      <thead>
        <tr>
          <th>عکس</th>
          <th>نام</th>
          <th>نام انگلیسی</th>
          <th>برند</th>
          <th>دسته</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <Image
                src={product.primary_image}
                style={{ borderRadius: "50px" }}
                width={35}
                height={35}
                alt=""
              />
            </td>
            <td>{product.name}</td>
            <td>{product.slug}</td>
            <td>{product.brand}</td>
            <td>{product.category}</td>
            <td>
              <Badge
                variant={product.is_active ? "success" : "error"}
                size="tiny"
              >
                {product.is_active ? "فعال" : "غیرفعال"}
              </Badge>
            </td>
            <td>
              <div className="flex gap-4">
                <IconTrash
                  width={18}
                  height={18}
                  onClick={() => onDeleteClick(product)}
                />
                <div className="relative flex">
                  <IconPen
                    width={18}
                    height={18}
                    onClick={() => toggleMenu(product.id)}
                  />
                  <DropdownMenu
                    isOpen={openMenuId === product.id}
                    toggleMenu={() => toggleMenu(product.id)}
                  >
                    <Link className="hover:bg-[#2e3060] px-3 hover:text-white" href={`products/update/${product.id}/product`}>
                      <span>ویرایش محصول</span>
                    </Link>
                    <Link className="hover:bg-[#2e3060] px-3 hover:text-white" href={`products/update/${product.id}/images`}>
                      <span>ویرایش تصاویر</span>
                    </Link>
                    <Link className="hover:bg-[#2e3060] px-3 hover:text-white" href={`products/update/${product.id}/category`}>
                      <span>ویرایش دسته بندی و ویژگی</span>
                    </Link>
                  </DropdownMenu>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;

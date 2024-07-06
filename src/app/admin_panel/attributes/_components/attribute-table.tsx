import React from "react";

import { IconPen, IconTrash } from "@/app/_components/icons/icons";
import Link from "next/link";
import { Attribute } from "../_types/attribute.interface";

type AttributeTableProps = {
  attributes: Attribute[];
  onDeleteClick: (Attribute: Attribute) => void;
};

const AttributeTable: React.FC<AttributeTableProps> = ({
  attributes,
  onDeleteClick,
}) => (
  <table className="table mt-[20px]">
    <thead>
      <tr>
        <th>نام</th>
        <th>عملیات</th>
      </tr>
    </thead>
    <tbody>
      {attributes.map((attribute) => (
        <tr key={attribute.id}>
          <td>{attribute.name}</td>
          <td>
            <div className="flex gap-4">
              <IconTrash
                width={18}
                height={18}
                onClick={() => onDeleteClick(attribute)}
              />
              <Link href={`attributes/update/${attribute.id}`}>
                <IconPen width={18} height={18} />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AttributeTable;

"use client";
import React from "react";
import UpdateForm from "../../_components/update-form";
import { useParams } from "next/navigation";
import { useTag } from "../../_api/show-tag";

export default function UpdateTag() {
  const params = useParams();
  const id = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : parseInt(params.id);

  const { data: tag, isFetching } = useTag({ id });

  return (
    <section className="flex justify-center mt-[60px]">
      <div className="p-[36px] border-[1px] border-solid h-auto border-charcoal bg-dark-navy rounded-3xl w-[70%]">
        <div className="text-white text-[20px] pb-[20px] border-b-[1px] border-solid border-charcoal">
          تغییر برند
        </div>
        <UpdateForm data={tag?.data} isLoading={isFetching} />
      </div>
    </section>
  );
}

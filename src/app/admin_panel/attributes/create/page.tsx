import React from "react";
import CreateForm from "../_components/create-form";

export default function CreateBrand() {
  return (
    <section className="flex justify-center mt-[60px]">
      <div className="p-[36px] border-[1px] border-solid h-auto border-charcoal bg-dark-navy rounded-3xl w-[70%]">
        <div className="text-white text-[20px] pb-[20px] border-b-[1px] border-solid border-charcoal">
          اضافه کردن ویژگی
        </div>
        <CreateForm />
      </div>
    </section>
  );
}

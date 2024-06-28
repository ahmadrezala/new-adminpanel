"use client";

import Image from "next/image";
import { IconHome } from "../_components/icons/icons";
import { Button } from "../_components/button/button";
import { useForm } from "react-hook-form";
import { Textbox } from "../_components/textbox/textbox";
import { TextInput } from "../_components/form-input";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col px-[40px]">
        <div className="mt-[90px]">
          <h1 className="text-white text-[24px]">محصولات</h1>
        </div>

        <section className="flex justify-center mt-[60px]">
          <div className="p-[36px] border-[1px] border-solid border-charcoal bg-dark-navy rounded-3xl w-[70%]">
            <div className="text-white text-[20px] pb-[20px] border-b-[1px] border-solid border-charcoal">
              اضافه کردن محصول
            </div>
            <div className="">
              {/* <div className="mt-[18px] mb-9">
                <h1 className="text-white mb-1">جزییات محصول</h1>
                <p className=" text-light">لطفعا جزییات را با دقت پر کنید</p>
              </div> */}
              <form className="mt-[18px]" action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between">
                  <div className="w-[49%]">
                    <TextInput
                      rules={{
                        required: "فیلد نام الزامی است",
                      }}
                      errors={errors}
                      label={"نام"}
                      register={register}
                      name={"name"}
                    />
                  </div>
                  <div className="w-[49%]">
                    <TextInput
                      rules={{
                        required: "فیلد نام الزامی است",
                      }}
                      errors={errors}
                      label={"نام"}
                      register={register}
                      name={"name"}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-[20px]">
                  <Button type="submit" variant="charcoal" size="large">
                    ایجاد محصول
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

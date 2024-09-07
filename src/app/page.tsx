"use client";
import { useForm } from "react-hook-form";
import { TextInput } from "./_components/form-input";
import "./globals.css";
import { Button } from "./_components/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBrand>();

  return (
    <section className=" h-screen w-full flex items-center justify-center">
      <div className="py-[36px] px-[80px] grid gap-7 grid-cols-[400px_400px] border-[1px]  border-solid h-auto border-charcoal bg-dark-navy rounded-3xl">
        <div className="flex flex-col gap-4">
          <div className="text-white flex justify-center text-[20px] pb-[20px] border-b-[1px] border-solid border-charcoal">
            ثبت نام در فروشگاه انلاین
          </div>
          <TextInput
            rules={{ required: "فیلد نام الزامی است" }}
            errors={errors}
            label="نام"
            register={register}
            name="name"
          />

          <TextInput
            rules={{ required: "فیلد نام الزامی است" }}
            errors={errors}
            label="ایمیل"
            register={register}
            name="slug"
          />
          <TextInput
            rules={{ required: "فیلد نام الزامی است" }}
            errors={errors}
            label="رمز عبور"
            register={register}
            name="slug"
          />
          <TextInput
            rules={{ required: "فیلد نام الزامی است" }}
            errors={errors}
            label="تکرار رمز عبور"
            register={register}
            name="slug"
          />
          <div className="mt-3 pt-6 border-t-[1px] border-t-solid border-t-charcoal">
            <Button
              className="w-full flex justify-center"
              variant="charcoal"
              size="large"
            >
              ثبت نام
            </Button>
          </div>
          <div className="flex justify-center gap-3">
            <Link href={'./'}>ورود</Link>
            <Link href={'./'}>ثبت نام</Link>
          </div>
        </div>

        <div className="rounded-2xl w-[400px] h-[600px]  overflow-hidden">
          <div className="relative transform hover:scale-110 duration-500 w-[500px] h-[600px]">
            <Image
              src="/images/bg-login.jpg"
              style={{ objectFit: "cover", overflow: "hidden" }}
              fill
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

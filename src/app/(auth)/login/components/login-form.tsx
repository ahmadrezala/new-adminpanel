"use client";
import "../../../globals.css";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { TextInput } from "@/app/_components/form-input";
import { Button } from "@/app/_components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../types/login-schema";
import { Login } from "../types/login.types";
import { useEffect, useTransition } from "react";
import { useNotificationStore } from "@/stores/notification.store";
import { useFormState } from "react-dom";
import { loginAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const [formState, action] = useFormState(loginAction, undefined);

  const [isPending, startTransition] = useTransition();
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  const router = useRouter();

  useEffect(() => {
    if (formState && !formState.isSuccess && formState.error) {
      console.log(formState.error?.title);
      showNotification({
        message: formState.error?.title!,
        type: "error",
      });
    } else if (formState && formState.isSuccess) {
      showNotification({
        message: "ورود با موفقیت انجام شد",
        type: "success",
      });
      router.push('/admin_panel');
     
    }
  }, [showNotification, formState, router]);

  const onSubmit = (data: Login) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    startTransition(async () => {
      await action(formData);
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-white flex justify-center text-[20px] pb-[20px] border-b-[1px] border-solid border-charcoal">
        ورود به فروشگاه انلاین
      </div>

      <TextInput
        errors={errors}
        label="ایمیل"
        register={register}
        name="email"
      />
      <TextInput
        errors={errors}
        label="رمز عبور"
        register={register}
        name="password"
      />

      <div className="mt-3 pt-6 border-t-[1px] border-t-solid border-t-charcoal">
        <Button
          type="submit"
          className="w-full flex justify-center"
          variant="charcoal"
          size="large"
          isLoading={isPending}
        >
          ثبت نام
        </Button>
      </div>
      <div className="flex justify-center gap-3">
        <Link href={"./login"}>ورود</Link>
        <Link href={"./signin"}>ثبت نام</Link>
      </div>
    </form>
  );
}

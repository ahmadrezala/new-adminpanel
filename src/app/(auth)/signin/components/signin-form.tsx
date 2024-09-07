"use client";
import "../../../globals.css";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { TextInput } from "@/app/_components/form-input";
import { Button } from "@/app/_components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../types/signin-schema";
import { SignIn } from "../types/signin.types";
import { signInAction } from "@/actions/auth";
import { useFormState} from "react-dom";
import { useEffect, useTransition } from "react";
import { useNotificationStore } from "@/stores/notification.store";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: zodResolver(signinSchema),
  });

  const [formState, action] = useFormState(signInAction, null);

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  useEffect(() => {
    if (formState && !formState.isSuccess && formState.error) {
      showNotification({
        message: formState.error?.detail!,
        type: "error",
      });
    } else if (formState && formState.isSuccess) {
      router.push(`/login`);
      showNotification({
        message: "عضویت با موفقیت انجام شد",
        type: "success",
      });
    }
  }, [showNotification, formState]);

  const onSubmit = (data: SignIn) => {

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    startTransition(async () => {

      await action(formData);
    })

  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-white flex justify-center text-[20px] pb-[20px] border-b-[1px] border-solid border-charcoal">
        ثبت نام در فروشگاه انلاین
      </div>
      <TextInput errors={errors} label="نام" register={register} name="name" />

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
      <TextInput
        errors={errors}
        label="تکرار رمز عبور"
        register={register}
        name="password_confirmation"
      />
      <div className="mt-3 pt-6 border-t-[1px] border-t-solid border-t-charcoal">
        <Button
          type="submit"
          className="w-full flex justify-center"
          variant="charcoal"
          size="large"
          isLoading = {isPending}
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

"use client";
import React, { useEffect } from "react";
import { Changelanguage } from "../change_language/change_language";
import { IconLogout } from "../icons/icons";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { loginAction, logout } from "@/actions/auth";
import { getSession, signIn } from "next-auth/react";
import { Loading } from "../loading";

export const Header: React.FC = () => {
  const router = useRouter();
  const [signOutState, logoutAction] = useFormState(logout, undefined);
  const [signinState, signinAction] = useFormState(loginAction, undefined);

  useEffect(() => {
    if (signOutState?.isSuccess) {
      const fetchSession = async () => await getSession();
      fetchSession();
      router.push("/login");
    }
  }, [signOutState, router]);

  useEffect(() => {
    if (signinState?.isSuccess) {
      const fetchSession = async () => await getSession();
      fetchSession();
    }

  })
  return (
    <header className="dark:bg-dark-navy px-[40px] ">
      <div className="container h-full flex items-center justify-between">
        <Changelanguage />
        <span>
          {/* <IconLogout className="cursor-pointer" viewBox = '0 -4 20 24' strokeWidth = '1' width={30} height={30}/> */}
          <form action={logoutAction as () => void}>
            <LogoutButton />
          </form>
        </span>
      </div>
    </header>
  );
};

const LogoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="btn-small btn btn-error">
      {pending && <Loading size="tiny" />}
      خروج از حساب کاربری
    </button>
  );
};

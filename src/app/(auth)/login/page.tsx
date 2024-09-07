import Image from "next/image";
import React from "react";
import LoginForm from "./components/login-form";

export default function Login() {
  return (
    <section className=" h-screen w-full flex items-center justify-center">
      <div className="py-[36px] px-[80px] grid gap-7 grid-cols-[400px_400px] border-[1px]  border-solid h-auto border-charcoal bg-dark-navy rounded-3xl">
        <LoginForm/>
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

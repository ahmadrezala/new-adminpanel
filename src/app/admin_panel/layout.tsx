import "../globals.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Sidebar } from "../_components/sidebar/sidebar";
import { Header } from "../_components/header";
import Footer from "../_components/footer/footer";
import { Notifications } from "../_components/notification/notifications";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";




const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
  variable: "--font-inter",
});

const yekanbakh = LocalFont({
  src: [
    {
      path: "../../../public/fonts/YekanBakh/YekanBakhLight300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/YekanBakh/YekanBakhMedium500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/YekanBakh/YekanBakhHeavy900.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-yekanbakh",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  const session = await auth()
  if(session){

    console.log(session);
    
  }




  return (
    <main className=" grid grid-cols-[300px_1fr]  dark:bg-black dark:text-white ">
        <Notifications />
      <Sidebar />
      <div className="overflow-y-scroll h-screen grid grid-rows-[90px_1fr_40px]">
        <Header />
        {children}
        <Footer />
      </div>
    </main>
  );
}

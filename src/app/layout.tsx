import "./globals.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import QuertProvider from "@/providers/react-query-provider";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
  variable: "--font-inter",
});

const yekanbakh = LocalFont({
  src: [
    {
      path: "../../public/fonts/YekanBakh/YekanBakhLight300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakh/YekanBakhMedium500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakh/YekanBakhHeavy900.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-yekanbakh",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="rtl"
      className={`dark ${inter.variable} ${yekanbakh.variable}`}
    >
      <body className=" dark:bg-black dark:text-white ">
        <QuertProvider>{children}</QuertProvider>
      </body>
    </html>
  );
}

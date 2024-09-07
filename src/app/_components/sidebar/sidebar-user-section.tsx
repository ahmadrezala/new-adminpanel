"use client";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function SidebarUserSection() {
  const [session, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
      const fetchSession = async () => {
          const session = await getSession()

          setToken(session);
      }
      fetchSession();
    
      


  }, []);

  return (
    <div className="px-8">
      <div className="border-charcoal flex flex-col gap-1 justify-center items-center border-b-[1px] h-full">
        <Image
          src="/images/prof2.jpg"
          style={{ borderRadius: "50px" }}
          width={70}
          height={70}
          alt=""
        />
        {session && <h3 className="text-[18px] mt-2">{session.user.name}</h3>}
        <h6>ادمین</h6>
      </div>
    </div>
  );
}

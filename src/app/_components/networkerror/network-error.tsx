import React from 'react';
import { Button } from "@/app/_components/button";
import { IconRefresh } from "@/app/_components/icons/icons";

interface NetworkErrorProps {
  onRetry: () => void;
}

const NetworkError: React.FC<NetworkErrorProps> = ({ onRetry }) => {
  return (
    <div className="h-full w-full flex flex-col gap-5 items-center justify-center bg-black text-error-content">
      <h1 className="text-[30px] font-extrabold">مشکل در اتصال به شبکه</h1>
      <div className="text-center mt-3">
        <Button
          variant="error"
          className="font-semibold"
          isOutline={true}
          onClick={onRetry}
        >
          <IconRefresh />
          تلاش مجدد
        </Button>
      </div>
    </div>
  );
};

export default NetworkError;

import React from "react";
import { ConfirmDialogProps } from "./confirm-dialog.types";
import { Button } from "../button";



const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,

}) => {
  if (isOpen == false) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h1>{message}</h1>
        <div>

        <Button className="bg-gradient-first px-6 text-[20px]" size="normal" onClick={onConfirm}>تأیید</Button >
        <Button className="bg-error-content px-6 text-[20px]" size="normal" onClick={onCancel}>لغو</Button >
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

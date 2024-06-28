export type ConfirmDialogProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
  };
import React, { createContext, useState } from 'react';
import ConfirmDialog from '@/components/common/confirm-dialog';

interface IConfirmContextData {
  openDialog: (params: any) => void;
}

const ConfirmContext = createContext<IConfirmContextData>({
  openDialog: () => {
    return;
  },
});

export interface ConfirmProps {
  message: string;
  title: string;
}
interface DialogConfig {
  confirmCallback: (value: unknown) => void;
}
type Props = {
  children: React.ReactNode;
};
export const ConfirmContextProvider = ({ children }: Props) => {
  const [confirmData, setConfirmData] = useState<ConfirmProps>({
    message: '',
    title: '',
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>();
  const resetDialog = () => {
    setIsOpen(false);
    setDialogConfig(undefined);
  };
  const openDialog = ({
    message,
    title,
    confirmCallback,
  }: ConfirmProps & DialogConfig) => {
    setIsOpen(true);
    setConfirmData((prev) => {
      return {
        ...prev,
        message,
        title,
      };
    });
    setDialogConfig((prev) => {
      return {
        ...prev,
        confirmCallback,
      };
    });
  };
  const onConfirm = () => {
    dialogConfig?.confirmCallback(true);
    resetDialog();
  };
  return (
    <ConfirmContext.Provider value={{ openDialog }}>
      {children}
      <ConfirmDialog
        content={confirmData.message}
        title={confirmData.title}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={onConfirm}
      />
    </ConfirmContext.Provider>
  );
};
export default ConfirmContext;

import React, { createContext, useState } from 'react';
import CustomDialog from '@/components/common/modal';

interface IModalConfig {
  open: () => void;
  close: () => void;
  getComponent: (component: React.ReactNode) => void;
  getModalConfig: (config: ModalProps) => void;
}
export type ModalProps = {
  title: string;
  cancelText: string;
  saveText: string;
  children: React.ReactNode;
};
const ModalContext = createContext<IModalConfig>({
  open: () => {
    return;
  },
  close: () => {
    return;
  },
  getComponent: () => {
    return;
  },
  getModalConfig: () => {
    return;
  },
});

type Props = {
  children: React.ReactNode;
};
export const ModalContextProvider = ({ children }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<ModalProps>({
    title: '',
    cancelText: '',
    saveText: '',
    children: null,
  });
  const open = () => {
    setIsShow(true);
  };
  const close = () => {
    setIsShow(false);
  };
  const getComponent = (_comp: React.ReactNode) => {
    return _comp;
  };
  const getModalConfig = (modalProps: ModalProps) => {
    setModalConfig(modalProps);
    setIsShow(true);
  };

  return (
    <ModalContext.Provider
      value={{ open, close, getComponent, getModalConfig }}
    >
      {children}
      <CustomDialog
        isOpen={isShow}
        setIsOpen={setIsShow}
        title={modalConfig.title}
      >
        {modalConfig.children}
      </CustomDialog>
    </ModalContext.Provider>
  );
};
export default ModalContext;

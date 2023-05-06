import { useContext } from 'react';
import ModalContext, { ModalProps } from '@/context/modal-context';

export default function useModal() {
  const { open, close, getModalConfig } = useContext(ModalContext);
  const modal = (modalProps: ModalProps) => {
    getModalConfig(modalProps);
  };
  return {
    open,
    close,
    modal,
  };
}

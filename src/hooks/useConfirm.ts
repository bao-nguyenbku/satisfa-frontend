import { useContext } from 'react';
import ConfirmContext, { ConfirmProps } from '@/context/confirm-dialog-context';

export default function useConfirm() {
  const { openDialog } = useContext(ConfirmContext);
  const confirm = ({ ...confirmProps }: ConfirmProps) => {
    return new Promise((resolve) => {
      openDialog({ confirmCallback: resolve, ...confirmProps });
    });
  };
  return {
    confirm,
  };
}


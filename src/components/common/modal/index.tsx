import React from 'react';
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import Button from '@/components/common/button';
import styles from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children?: React.ReactNode;
  cancel?: {
    title: string;
    action: () => void;
  };
  save?: {
    title: string;
    action: () => void;
  };
  isFooter?: boolean;
};

export default function CustomDialog(props: Props) {
  const {
    isOpen,
    setIsOpen,
    children,
    title = 'Title',
    cancel,
    save,
    isFooter = false,
  } = props;
  const handleClose = () => {
    setIsOpen(false);
  };
  // const handleCancel = () => {
  //   if (!cancel) {
  //     setIsOpen(false);
  //   }
  //   cancel?.action();
  // };
  // const handleSave = () => {
  //   if (!save) {
  //     setIsOpen(false);
  //   }
  //   save?.action();
  // };
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);

  return (
    <div>
      <Dialog
        open={isOpen}
        fullWidth
        className={styles.dialogRoot}
        maxWidth='lg'
        disablePortal
        onClose={handleClose}
        scroll='paper'
        keepMounted
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <div className='flex items-center justify-between w-full bg-primary-dark px-4 text-white'>
          <h2 id='scroll-dialog-title' className='p-4 font-bold text-xl'>
            {title}
          </h2>
          <IconButton className='hover:bg-white/10' onClick={handleClose}>
            <CloseIcon className='text-white'/>
          </IconButton>
        </div>
        <DialogContent className='bg-zinc-800/50 backdrop-blur-lg text-white'>{children}</DialogContent>
        {isFooter && (
          <DialogActions>
            {cancel?.title && cancel.action && (
              <Button onClick={cancel?.action} className='bg-none'>
                {cancel?.title}
              </Button>
            )}
            <Button onClick={save?.action} autoFocus>
              {save?.title}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

// <Button onClick={handleCancel} className={styles.cancelBtn}>
//   {cancel ? cancel.title : "Cancel"}
// </Button>
// <Button onClick={handleSave} className={styles.saveBtn}>
//   {save ? save.title : "Save"}
// </Button>

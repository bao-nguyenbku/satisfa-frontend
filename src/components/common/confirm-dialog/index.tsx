import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content?: any;
  title?: string;
  onConfirm: () => void;
};

export default function ConfirmDialog(props: Props) {
  const { isOpen, setIsOpen, content = '', title = 'Title', onConfirm } = props;
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleConfirm = () => {
    onConfirm();
  };
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
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className={styles.dialogRoot}
      scroll="paper"
      maxWidth="lg"
      disablePortal
      sx={{
        background: 'none',
        borderRadius: 0,
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button className={styles.cancelBtn} onClick={handleClose}>
          Cancel
        </Button>
        <Button className={styles.confirmBtn} onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

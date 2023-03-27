import React, { useState } from 'react';
import Image from 'next/image';
import SatisgiAvatar from '@/assets/images/satisgi.jpg';
import styles from './styles.module.scss';
import { Popover, ClickAwayListener } from '@mui/material';
import MessageBox from '../mesage-box';

// type Props = {};
const ChatbotButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          className={styles.popover}
          keepMounted
          disablePortal
          hideBackdrop
          disableScrollLock
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}>
          <MessageBox />
        </Popover>
      </ClickAwayListener>
      <button
        className="fixed w-20 h-20 bottom-12 right-20 border-gray-600 bg-white/5 p-4 border rounded-full z-10"
        onClick={handleClick}>
        <div className="relative w-full h-full">
          <Image
            src={SatisgiAvatar}
            fill
            className="rounded-full object-cover"
            alt="bot-avatar"
          />
        </div>
      </button>
    </>
  );
};

export default ChatbotButton;

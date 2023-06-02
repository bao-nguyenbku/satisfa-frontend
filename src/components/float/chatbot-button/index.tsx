import React from 'react';
import Image from 'next/image';
import SatisgiAvatar from '@/assets/images/satisgi.jpg';
import styles from './styles.module.scss';
import { Popover, ClickAwayListener } from '@mui/material';
import MessageBox from '@/components/mesage-box';
import useChatbot from '@/hooks/useChatbot';
import Wrapper from '@/components/float/wrapper';

// type Props = {};
const ChatbotButton = () => {
  const { open, isOpen, close } = useChatbot();
  const handleClose = () => {
    close();
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    open();
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <Popover
          open={isOpen}
          onClose={handleClose}
          className={styles.popover}
          PaperProps={{
            style: {
              borderRadius: 8,
              width: '100%',
              height: '100%',
            },
          }}
          keepMounted
          disablePortal={false}
          hideBackdrop
          disableScrollLock
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <MessageBox boxOpen={isOpen} />
        </Popover>
      </ClickAwayListener>

      <Wrapper>
        <button onClick={handleClick}>
          <div className="relative w-full h-full">
            <Image
              src={SatisgiAvatar}
              fill
              className="rounded-full object-cover"
              alt="bot-avatar"
            />
          </div>
        </button>
      </Wrapper>
    </>
  );
};

export default ChatbotButton;

import React from 'react';
import Image from 'next/image';
import SatisgiAvatar from '@/assets/images/satisgi.jpg';
import styles from './styles.module.scss';
import { Popover } from '@mui/material';

type Props = {};

const CircleButton = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={styles.popover}
        style={{
          top: -20
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        >
        <div className='w-[500px] h-[600px] rounded-3xl'>
          <div
            className='w-full h-20 bg-dark-2 flex items-center'
          >
            <span className='text-white'>Satisgi</span>
          </div>
        </div>
      </Popover>
      <button
        className="absolute w-20 h-20 bottom-12 right-12 border-gray-600 bg-white/5 p-4 border rounded-full"
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

export default CircleButton;

import React, { useState } from 'react';
import Link from 'next/link';
import * as _ from 'lodash';
import { useAppSelector } from '@/hooks';
import { selectUserState } from '@/store/reducer/user';
import { podkova } from '@/constants/font';
// import AccountMenu from './account-menu';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenuResponsive from './account-menu-res';

const ExpandButton = () => {
  const user = useAppSelector(selectUserState);
  const [open, setOpen] = useState(false);
  const handleToggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        keepMounted
        PaperProps={{
          className: 'w-2/4 bg-transparent',
        }}
        className='bg-transparent'
        onClose={handleToggleDrawer}>
        <ul className='flex flex-col justify-start py-4 gap-6 text-center bg-zinc-800/50 backdrop-blur-lg h-full text-white'>
          <li className={`flex items-center justify-center text-2xl ${podkova.className} text-center`}>SATISFA</li>
          <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow">
            <Link href="/#about-us">About us</Link>
          </li>
          <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow">
            <Link href="/menu">Our menu</Link>
          </li>
          <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow">
            <Link href="/reservation">Reservation</Link>
          </li>
          <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow">
            <Link href="#footer">Contact</Link>
          </li>
          <hr className='flex mx-auto w-9/12'/>
          {!user.isLoading && user.isSuccess && !_.isEmpty(user.data) ? (
            <li>
                <AccountMenuResponsive data={user.data} />
            </li>
          ) : (
            <li className="hover:bg-primary-yellow hover:transition-colors p-2">
              <Link href="/login">Sign in</Link>
            </li>
          )}
        </ul>
      </Drawer>
      <IconButton
        onClick={handleToggleDrawer}
        color="inherit"
        aria-label="menu"
        >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default ExpandButton;

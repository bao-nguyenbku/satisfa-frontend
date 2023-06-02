import React, { useState } from 'react';
import Link from 'next/link';
import * as _ from 'lodash';
import { useAppSelector } from '@/hooks';
import { selectUserState } from '@/store/reducer/user';
import { Divider, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenuResponsive from './account-menu-res';
import { navigation } from '.';

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
        keepMounted={false}
        PaperProps={{
          className: 'w-screen bg-transparent',
        }}
        className="bg-transparent"
        onClose={handleToggleDrawer}>
        <div className="h-full bg-primary text-slate-800 p-4 flex flex-col">
          <IconButton className="ml-auto" onClick={handleToggleDrawer}>
            <CloseIcon />
          </IconButton>
          <ul className="flex flex-col justify-start py-4 gap-6 text-center">
            {navigation.map((item, index) => {
              return (
                <li
                  key={item.href}
                  className="flex"
                  data-aos="fade-down"
                  data-aos-delay={index * 100}>
                  <Link
                    href={item.href}
                    onClick={handleToggleDrawer}
                    className="hover:bg-primary-orange hover:text-white transition-colors duration-300 py-4 w-full">
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <Divider className="border-slate-600" />
            {!user.isLoading && user.isSuccess && !_.isEmpty(user.data) ? (
              <li className='hover:bg-second transition-colors duration-300'>
                <AccountMenuResponsive data={user.data} handleToggleDrawer={handleToggleDrawer}/>
              </li>
            ) : (
              <li className="hover:bg-primary-orange hover:transition-colors p-2">
                <Link href="/login">Sign in</Link>
              </li>
            )}
          </ul>
        </div>
      </Drawer>
      <IconButton
        onClick={handleToggleDrawer}
        color="inherit"
        aria-label="menu">
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default ExpandButton;

import React, { useState } from 'react';
import Link from 'next/link';
import * as _ from 'lodash';
import { useAppSelector } from '@/hooks';
import { selectUserState } from '@/store/reducer/user';
import { Divider, Drawer, IconButton } from '@mui/material';
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
        keepMounted
        PaperProps={{
          className: 'w-screen bg-transparent',
        }}
        className="bg-transparent"
        onClose={handleToggleDrawer}>
        <ul className="flex flex-col justify-start py-4 gap-6 text-center bg-zinc-800/50 backdrop-blur-lg h-full text-white">
          {navigation.map((item) => {
            return (
              <li key={item.href} className="flex">
                <Link
                  href={item.href}
                  onClick={handleToggleDrawer}
                  className="hover:bg-zinc-700 py-4 w-full">
                  {item.title}
                </Link>
              </li>
            );
          })}
          <Divider className="border-slate-600" />
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
        aria-label="menu">
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default ExpandButton;

import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { User } from '@/types';
import Image from '@/components/common/image';

type Props = {
  data: User;
};
export default function AccountMenu(props: Props) {
  const { data } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const menu = [
    {
      title: 'Profile',
      link: '/me/profile',
    },
    {
      title: 'My orders',
      link: '/me/orders',
    },
    {
      title: 'My reservations',
      link: '/me/reservations',
    },
    {
      title: 'Sign out',
      link: '/api/auth/signout',
    },
  ];
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <li
        onClick={handleOpenMenu}
        className="items-center gap-2 transition-colors duration-300 p-2 cursor-pointer lg:flex hidden">
        <Image
          src={data?.avatar}
          alt="user-avatar"
          className="object-cover rounded-full w-12 h-12"
          quality={70}
          width={70}
          height={70}
        />
        <span className='hover:border-primary-orange hover:text-primary-orange'>{data?.fullname}</span>
      </li>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          className: 'bg-second text-slate-800 border border-slate-800 rounded-none',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {menu.map((item) => {
          if (item.title === 'Sign out') {
            return (
              <MenuItem
                onClick={handleSignOut}
                key={item.title}
                className="text-red-600 hover:bg-primary">
                {item.title}
              </MenuItem>
            );
          }
          return (
            <MenuItem
              onClick={handleClose}
              key={item.title}
              className="hover:bg-primary">
              <Link href={item.link} className="flex items-center">
                {item.title}
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
}

import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { User } from '@/types';
import Image from '@/components/common/image';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  data: User;
};
export default function AccountMenuResponsive(props: Props) {
  const { data } = props;
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
  const [isOpen, setIsOpen] = React.useState(false);
  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };
  console.log(isOpen)
  const menu = [
    {
      title: 'My orders',
      icon: <PersonAdd />,
      link: '/me/orders',
    },
    {
      title: 'My reservations',
      icon: <Settings />,
      link: '/me/reservations',
    },
    {
      title: 'Sign out',
      icon: <Logout />,
      link: '/api/auth/signout',
    },
  ];
//   const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
  const handleSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
    // handleClose();
    openMenu();
  };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };
  return (
    <React.Fragment>
      <li
        // onClick={handleOpenMenu}
        // onClick={openMenu}
        className="flex justify-between items-center gap-2 hover:bg-primary-yellow hover:transition-colors p-2 cursor-pointer">
        <div className="flex items-center gap-2">
          <Image
            src={data?.avatar}
            alt="user-avatar"
            className="object-cover rounded-full w-12 h-12"
            quality={70}
            width={70}
            height={70}
          />
          <span>{data?.fullname}</span>
        </div>
        <motion.div className="menu-item" onClick={openMenu}>
          <ExpandMoreIcon />
        </motion.div>
      </li>
      <motion.div
        className="sub-menu"
        initial="exit"
        animate={isOpen ? 'enter' : 'exit'}
        variants={subMenuAnimate}>
        {/* <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          className="bg-transparent"
          //   onClick={handleClose}
          //   PaperProps={{
          //     elevation: 0,
          //   }}
          //   transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          {menu.map((item) => {
            if (item.title === 'Sign out') {
              return (
                <MenuItem
                  onClick={handleSignOut}
                  key={item.title}
                  className="text-red-600">
                  <ListItemIcon className="text-inherit">
                    {item.icon}
                  </ListItemIcon>
                  {item.title}
                </MenuItem>
              );
            }
            return (
              <MenuItem onClick={handleClose} key={item.title}>
                <Link href={item.link} className="flex items-center">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.title}
                </Link>
              </MenuItem>
            );
          })}
        </Menu> */}
        {isOpen && (
          <ul className="flex flex-col items-start gap-2 p-2">
            {menu.map((item) => {
              if (item.title === 'Sign out') {
                return (
                  <li
                    onClick={handleSignOut}
                    key={item.title}
                    className="text-red-600 flex gap-0">
                    <ListItemIcon className="text-white">
                      {item.icon}
                    </ListItemIcon>
                    {item.title}
                  </li>
                );
              }
              return (
                <li onClick={openMenu} key={item.title}>
                  <Link href={item.link} className="flex gap-0">
                    <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </React.Fragment>
  );
}

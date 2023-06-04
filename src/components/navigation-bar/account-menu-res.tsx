import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { User } from '@/types';
import Image from '@/components/common/image';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  data: User;
  handleToggleDrawer: () => void;
};
export default function AccountMenuResponsive(props: Props) {
  const { data, handleToggleDrawer } = props;
  //   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //   const open = Boolean(anchorEl);
  const [isOpen, setIsOpen] = React.useState(false);
  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };
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
  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between items-center gap-2 p-2 cursor-pointer"
        onClick={openMenu}>
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
        <motion.div className="menu-item">
          <ExpandMoreIcon />
        </motion.div>
      </div>
      <div>
        {isOpen && (
          <ul className="flex flex-col items-start gap-2 p-2">
            {menu.map((item, index) => {
              if (item.title === 'Sign out') {
                return (
                  <li
                    onClick={handleSignOut}
                    key={item.title}
                    data-aos="fade-down"
                    data-aos-delay={index * 100}
                    className="hover:bg-primary-orange hover:text-white text-red-600  py-2 w-full text-center cursor-pointer">
                    {item.title}
                  </li>
                );
              }
              return (
                <li
                  onClick={() => {
                    openMenu();
                    handleToggleDrawer();
                  }}
                  key={item.title}
                  className="flex w-full"
                  data-aos="fade-down"
                  data-aos-delay={index * 100}>
                  <Link
                    href={item.link}
                    className="hover:bg-primary-orange hover:text-white py-2 w-full">
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

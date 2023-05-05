import React from 'react';
import { signOut } from 'next-auth/react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { User } from '@/types/data-types';
import Image from '@/components/common/image';

type Props = {
  data: User;
};
export default function AccountMenu(props: Props) {
  const { data } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSignOut = () => {
    signOut({
      callbackUrl: '/'
    })
    handleClose();
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <li
        onClick={handleClick}
        className="flex items-center gap-2 hover:bg-primary-yellow hover:transition-colors p-2 cursor-pointer">
        <Image
          src={data?.avatar}
          alt="user-avatar"
          className="object-cover rounded-full w-12 h-12"
          quality={70}
          width={70}
          height={70}
        />
        <span>{data?.fullname}</span>
      </li>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          My orders
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          My reservations
        </MenuItem>
        <MenuItem onClick={handleSignOut} className='text-red-600'>
          <ListItemIcon className='text-inherit'>
            <Logout fontSize="small" className='text-inherit'/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

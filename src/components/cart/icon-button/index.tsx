import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Badge, Popover, IconButton } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CartDetail from '../cart-detail';
import { selectTotalQty, setCookieToCart } from '@/store/reducer/cart';

const CartIconButton = () => {
  const dispatch = useAppDispatch();
  const totalQty = useAppSelector(selectTotalQty);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    dispatch(setCookieToCart());
  }, []);
  

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        className='overflow-y-hidden bg-transparent rounded-none'
        disablePortal
        PaperProps={{
          className: 'overflow-y-hidden bg-transparent h-screen rounded-none'
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <CartDetail />
      </Popover>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        badgeContent={
          <div className="text-whit bg-yellow-600 w-4 h-4 p-1 rounded-xl flex items-center">
            {totalQty}
          </div>
        }>
        <IconButton onClick={handleClick}>
          <LocalMallOutlinedIcon className="text-white" />
        </IconButton>
      </Badge>
    </>
  );
};

export default CartIconButton;

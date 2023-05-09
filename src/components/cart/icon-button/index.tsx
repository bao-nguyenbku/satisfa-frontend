import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Badge, IconButton, Drawer } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CartDetail from '../cart-detail';
import {
  recoverCartFromCookie,
  selectTotalQty,
} from '@/store/reducer/cart';
import { primaryFont } from '@/constants';

const CartIconButton = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const totalQty = useAppSelector(selectTotalQty);
  const handleToggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    dispatch(recoverCartFromCookie());
  }, []);
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        keepMounted
        PaperProps={{
          className: 'min-w-[400px]',
        }}
        onClose={handleToggleDrawer}>
        <div className={primaryFont.className}>
          <CartDetail />
        </div>
      </Drawer>

      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        badgeContent={
          <div className="text-whit bg-yellow-600 w-4 h-4 p-1 rounded-xl flex items-center">
            {totalQty}
          </div>
        }>
        <IconButton onClick={handleToggleDrawer}>
          <LocalMallOutlinedIcon className="text-white" />
        </IconButton>
      </Badge>
    </>
  );
};

export default CartIconButton;

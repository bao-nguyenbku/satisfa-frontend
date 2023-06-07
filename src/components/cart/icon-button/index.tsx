import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Badge, IconButton, Drawer } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CartDetail from '../cart-detail';
import { recoverCartFromCookie, selectTotalQty } from '@/store/reducer/cart';
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
          className: 'min-w-[300px] md:min-w-[400px]',
        }}
        onClose={handleToggleDrawer}>
        <div className={primaryFont.className}>
          <CartDetail handleClose={handleToggleDrawer} />
        </div>
      </Drawer>

      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        badgeContent={
          <div className="text-whit bg-primary-orange w-4 h-4 p-2 rounded-xl flex items-center justify-center text-white">
            {totalQty}
          </div>
        }>
        <IconButton onClick={handleToggleDrawer} className="text-inherit" aria-label='open cart button' aria-pressed aria-expanded={open}>
          <LocalMallOutlinedIcon className="text-inherit" />
        </IconButton>
      </Badge>
    </>
  );
};

export default CartIconButton;

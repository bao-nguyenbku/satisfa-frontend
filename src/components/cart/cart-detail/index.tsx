import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Button from '@/components/common/button';
import CartItemDetail from '../cart-item';
import {
  selectAllItem,
  selectTotalCost,
  increaseQty,
  decreaseQty,
  removeItem,
} from '@/store/reducer/cart';

import { getItemList, saveTotalCost } from '@/store/reducer/order';
import { formatCurrency } from '@/utils';
import { useRouter } from 'next/router';
import { CartItem } from '@/types';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

type Props = {
  handleClose: () => void;
};
const isCartEmpty = (cartItems: CartItem[]) => {
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0)
    return false;
  return true;
};
export default function CartDetail(props: Props) {
  const { handleClose } = props;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectAllItem);
  const totalCost = useAppSelector(selectTotalCost);
  const router = useRouter();

  const onIncrease = (id: string) => {
    dispatch(increaseQty(id));
  };
  const onDecrease = (id: string) => {
    dispatch(decreaseQty(id));
  };
  const onRemove = (id: string) => {
    dispatch(removeItem(id));
  };
  const handleOrderClick = () => {
    dispatch(getItemList(cartItems));
    dispatch(saveTotalCost(totalCost));
    if (cartItems.length > 0) {
      router.push('/payment');
    }
  };
  const handleCloseCart = () => {
    handleClose();
  };

  return (
    <div className="h-screen w-full  bg-primary p-4 flex flex-col ">
      <div className="flex justify-between text-slate-800">
        <h2 className="text-inherit text-xl flex items-center pb-4">
          Your Cart
        </h2>
        <IconButton aria-label="close" onClick={handleCloseCart}>
          <ClearIcon className="text-inherit" />
        </IconButton>
      </div>

      <div className="flex flex-col gap-6 pt-2 h-9/12 overflow-y-auto">
        {isCartEmpty(cartItems) ? (
          cartItems.map((item) => {
            return (
              <CartItemDetail
                key={item.id}
                data={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            );
          })
        ) : (
          <span className="text-slate-800">Your cart is empty</span>
        )}
      </div>
      {isCartEmpty(cartItems) && (
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex justify-between text-slate-800 text-2xl">
            <span>Total</span>
            <span className='text-primary-orange'>{formatCurrency(totalCost)}</span>
          </div>
          <Button
            className="hover:bg-slate-800/80 normal-case text-xl text-white bg-slate-800 w-full h-16 mx-auto rounded-none"
            onClick={handleOrderClick}>
            Order now
          </Button>
        </div>
      )}
    </div>
  );
}

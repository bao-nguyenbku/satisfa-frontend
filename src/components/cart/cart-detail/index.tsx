import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Button from '@/components/common/button';
import CartItemDetail from '../cart-item';
import {
  selectAllItem,
  selectTotalCost,
  increaseQty,
  decreaseQty,
  removeItem,
  setCookieToCart,
} from '@/store/reducer/cart';

import { getItemList, saveTotalCost } from '@/store/reducer/order';
import { formatCurrency } from '@/utils';
import { useRouter } from 'next/router';
import { hasCookie, getCookie } from 'cookies-next';
import { CartItem } from '@/types/data-types';

const isCartEmpty = (cartItems: CartItem[]) => {
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0)
    return false;
  return true;
};
export default function CartDetail() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectAllItem);
  const totalCost = useAppSelector(selectTotalCost);
  const router = useRouter();
  const temp = getCookie('myCart');

  useEffect(() => {
    if (hasCookie('myCart')) {
      dispatch(setCookieToCart());
    }
  }, [temp]);

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

  return (
    <div className="h-screen w-full bg-primary-dark p-4 flex flex-col">
      <h2 className="text-yellow-500 text-xl flex items-center pb-4">
        Your Cart
      </h2>
      <div className="flex flex-col gap-6">
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
          <span className="text-white">Your cart is empty</span>
        )}
      </div>
      {isCartEmpty(cartItems) && (
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex justify-between text-primary-yellow text-2xl">
            <span>Total</span>
            <span>{formatCurrency(totalCost)}</span>
          </div>
          <Button
            className="hover:bg-yellow-500 normal-case text-xl text-white bg-yellow-600 w-full h-16 mx-auto rounded-none"
            onClick={handleOrderClick}>
            Order now
          </Button>
        </div>
      )}
    </div>
  );
}

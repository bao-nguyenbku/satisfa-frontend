import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import CartItemDetail from '../cart-item';
import {
  selectAllItem,
  selectTotalCost,
  increaseQty,
  decreaseQty,
  removeItem,
} from '@/store/reducer/cart';
import { formatCurrency } from '@/utils/currency-format';
import { useRouter } from 'next/router';

export default function CartDetail() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cartItems = useAppSelector(selectAllItem);
  const totalCost = useAppSelector(selectTotalCost);

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
    router.push('/payment');
  };
  return (
    <div className="min-w-[30vw] w-72 max-w-sm h-full overflow-y-hidden bg-transparent flex flex-col">
      <div className="bg-primary-dark text-yellow-500 text-lg flex items-center p-4 ">
        Your Cart
      </div>
      <div className="flex flex-col gap-4 p-4 !bg-gray-900/30 backdrop-blur-lg h-full">
        {cartItems.map((cartItem) => (
          <CartItemDetail
            data={cartItem}
            key={cartItem.id}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="mt-auto bg-primary-dark p-4 flex flex-col gap-4">
        <div className="text-white flex items-center justify-between">
          <span>Total</span>
          <span className='text-primary-yellow text-2xl'>{formatCurrency(totalCost)}</span>
        </div>
        <button
          className="hover:bg-yellow-500 bg-yellow-600 h-16 mx-auto normal-case text-white rounded-none w-full text-2xl"
          onClick={handleOrderClick}>
          Order now
        </button>
      </div>
    </div>
  );
}

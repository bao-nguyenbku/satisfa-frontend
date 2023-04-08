import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import styles from './styles.module.scss';
import { Grid, Button, Typography } from '@mui/material'
import CartItemDetail from '../cart-item';
import {
    selectAllItem,
    selectTotalCost,
    increaseQty,
    decreaseQty,
    removeItem,
    setCookieToCart,
} from '@/store/reducer/cart';

import {
    getItemList,
    saveTotalCost,
  } from '@/store/reducer/order';
import { formatCurrency } from '@/utils/currency-format';
import { useRouter } from 'next/router';
import { hasCookie, getCookie } from 'cookies-next';

export default function CartDetail(){
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectAllItem)
    const totalCost = useAppSelector(selectTotalCost)
    const router = useRouter();
    const temp = getCookie("myCart")

    useEffect(()=>{
        if (hasCookie("myCart")){
            dispatch(setCookieToCart())
        }
    },[temp])

    
    const onIncrease = (id: string) => {
        dispatch(increaseQty(id));
    };
    const onDecrease = (id: string) => {
        dispatch(decreaseQty(id));
    };
    const onRemove = (id: string) => {
        dispatch(removeItem(id))
    }
    const handleOrderClick = () => {
        dispatch(getItemList(cartItems));
        dispatch(saveTotalCost(totalCost));
        if (cartItems.length > 0){
            router.push('./payment')
        }
    }


    return(
        <div className={styles.cartModule}>
            <div className='bg-gray-600/70 h-[10%] text-yellow-500 text-lg flex items-center p-4'>
                Your Cart
            </div>
            <Grid container className='mt-8 h-4/6 overflow-y-scroll' rowGap={4}>
                {cartItems.map((cartItem)=>(
                    <Grid item xs={12} key={cartItem.id}>
                        <CartItemDetail
                        data={cartItem}
                        onIncrease={onIncrease}
                        onDecrease={onDecrease}
                        onRemove={onRemove}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className='bg-[#3D3D3D] h-2/6'>
                <Grid container justifyContent={"space-around"}>
                    <Grid item xs={3} className="mt-2">
                        <Typography variant='h6' className='text-white font-bold'>
                            Total
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className="mt-2">
                        <Typography variant='h6' className='text-yellow-500 text-right'>
                            {formatCurrency(totalCost)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className="mt-2 flex items-center justify-center">
                        <Button className='hover:bg-yellow-500 bg-yellow-600 w-9/12 h-16 mx-auto ' onClick={handleOrderClick}>
                            <Typography className='text-white font-bold'>
                                Order now
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <div>
                
            </div>
        </div>
    )
}
import React from 'react';

import { Typography } from '@mui/material';
import Image from 'next/image';
import styles from './styles.module.scss';
import { CartItem } from '@/types';
import { formatCurrency } from '@/utils';

type Props = {
    item: CartItem;
};

const sampleImage =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';
export default function OrderItem(props: Props) {
  const { item } = props
  return (
    <div className={styles.orderItem}>
      <div style={{ width: '90%' }} className="mx-auto flex justify-between">
          <div className='w-1/6 p-0'>
            <Image src={sampleImage} alt="Cake" width={100} height={100} />
          </div>
          <div className="flex flex-col gap-4 mx-0 my-auto w-7/12">
            <Typography variant="h5" style={{ color: 'white' }}>
              {item.name}
            </Typography>

            <Typography variant="h6" style={{ color: '#CA8A04' }}>
              {formatCurrency(item.price)}
            </Typography>
          </div>
          <div className=" w-1/6 mx-0 my-auto">
            <Typography style={{ fontSize: '40px', color: 'white' }}>
              {item.qty}
            </Typography>
          </div>
      </div>
    </div>
  );
}

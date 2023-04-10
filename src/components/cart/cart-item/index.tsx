import React from 'react';
import { Grid, IconButton, Button, Typography } from '@mui/material';
import { CartItem } from '@/types/data-types';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './styles.module.scss';
import { formatCurrency } from '@/utils';

type Props = {
  data: CartItem;
  onIncrease: (param: string) => void;
  onDecrease: (param: string) => void;
  onRemove: (param: string) => void;
};

type BtnProps = {
  data: CartItem;
  onIncrease: (param: string) => void;
  onDecrease: (param: string) => void;
};
import Image from 'next/image';

const QuantityButton = (props: BtnProps) => {
  const { data, onIncrease, onDecrease } = props;
  return (
    <Grid container alignContent={'center'}>
      <Grid item xs={4}>
        <Typography
          variant="body1"
          className="leading-10 text-gray-300 text-center bg-gray-500"
          align="center">
          {data.qty}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <IconButton
          className={styles.iconButton}
          onClick={() => onDecrease(data.id)}>
          <KeyboardArrowLeftIcon className="text-gray-300 text-center " />
        </IconButton>
      </Grid>
      <Grid item xs={4}>
        <IconButton
          className={styles.iconButton}
          onClick={() => onIncrease(data.id)}>
          <KeyboardArrowRightIcon className="text-gray-300 text-center" />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default function CartItemDetail(props: Props) {
  const { data, onIncrease, onDecrease, onRemove } = props;
  return (
    <Grid container rowGap={1}>
      <Grid item xs={3}>
        <Image src={data.images[0]} alt={data.name} height={300} width={300} />
      </Grid>
      <Grid item xs={9}>
        <Grid container rowGap={1}>
          <Grid item xs={12}>
            <Grid container justifyContent={'space-around'}>
              <Grid item xs={7}>
                <Grid container rowGap={1}>
                  <Grid item xs={12}>
                    <Typography className="text-white" variant="body1">
                      {data.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="text-white" variant="body2">
                      {data.qty}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="text-yellow-500" variant="body2">
                      {formatCurrency(data.price)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Typography className="text-yellow-500" variant="body1">
                  {formatCurrency(data.qty * data.price)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent={'space-between'}>
              <Grid item xs={5}>
                <QuantityButton
                  data={data}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
              </Grid>
              <Grid item xs={5}>
                <Button
                  onClick={() => onRemove(data.id)}
                  className="text-white bg-red-500 hover:bg-red-400 rounded-none"
                  variant="contained"
                  startIcon={<DeleteIcon />}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

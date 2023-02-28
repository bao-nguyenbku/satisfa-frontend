import { Button, Typography, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import styles from './styles.module.scss';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { yellow } from '@mui/material/colors';

interface FoodCardProps {
  image: string;
  name: string;
  price: number;
}

import { Playfair_Display } from '@next/font/google';

const playfair_display = Playfair_Display({
  subsets: ['latin'],
});

const priceColor = yellow[700];

export default function FoodCard(props: FoodCardProps) {
  return (
    <Grid
      className={styles.foodCard}
      container
      style={{
        fontFamily: 'Playfair Display',
        border: '1px solid white',
        height: '50vh',
      }}>
      <Grid item xs={12} marginTop={1}>
        <div style={{position: "relative", height: "10vh", width: "10vh"}}>
          <Image
            fill
            src={props.image}
            alt="background-image"
          />
        </div>
          
        
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid
            item
            xs={8}
            style={{ fontSize: '2rem', color: 'white', marginLeft: '1vw' }}>
            <Typography
              fontFamily={'Playfair Display'}
              fontSize={28}
              variant="h3">
              {props.name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            style={{ margin: '0' }}
            className={styles.iconButton}>
            <IconButton>
              <ErrorOutlineIcon fontSize="large" style={{ color: 'white' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3} style={{ marginLeft: '0.5vw' }}>
          <Grid item xs={6} style={{ margin: 'auto 0' }}>
            <Button
              style={{ borderRadius: 0 }}
              variant="contained"
              className="add-bt hover:bg-yellow-500 bg-yellow-600">
              Add
            </Button>
          </Grid>
          <Grid item xs={6} style={{ margin: 'auto 0' }}>
            <Typography
              fontFamily={'Playfair Display'}
              fontSize={36}
              style={{ color: '#ffeb3b' }}>
              ${props.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

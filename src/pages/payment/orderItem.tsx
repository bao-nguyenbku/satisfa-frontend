import React from 'react';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import styles from './styles.module.scss';

const sampleImage =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';
export default function OrderItem() {
  return (
    <div className={styles.orderItem}>
      <Box style={{ width: '90%' }} className="mx-auto">
        <Grid
          container
          className="bg-item-background"
          justifyContent="space-between">
          <Grid item xs={2} padding={0}>
            <Image src={sampleImage} alt="Cake" width={100} height={100} />
          </Grid>
          <Grid item xs={7} className="mx-0 my-auto">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" style={{ color: 'white' }}>
                  American food
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" style={{ color: '#CA8A04' }}>
                  680.000 VND
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} className="mx-0 my-auto">
            <Typography style={{ fontSize: '40px', color: 'white' }}>
              3
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

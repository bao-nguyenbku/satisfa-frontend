import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import styles from './styles.module.scss';
import OrderItem from './orderItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function Menu() {
  return (
    <div className="menu-page bg-dark-theme h-full">
      <div className={styles.menuHeader}>
        <div className={styles.firstLine} style={{ marginRight: '30px' }} />{' '}
        Payment{' '}
        <div style={{ marginLeft: '30px' }} className={styles.endLine} />
      </div>
      <div className="mx-auto mt-8 menu-content" style={{ width: '95vw' }}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12} className={styles.leftColumn}>
                <div className="bg-dark-form">
                  <Typography
                    marginLeft={4}
                    variant="h6"
                    className="text-yellow-600">
                    {' '}
                    CUSTOMER INFORMATION
                  </Typography>
                  <Grid
                    container
                    columnSpacing={2}
                    marginTop={4}
                    marginLeft={4}>
                    <Grid item xs={10} className="text-white">
                      <TextField
                        fullWidth
                        label="FULLNAME"
                        id="fullname"
                        value="name"
                      />
                    </Grid>
                    <Grid item xs={10} marginTop={4}>
                      <TextField
                        fullWidth
                        label="FULLNAME"
                        id="fullname"
                        value="name"
                      />
                    </Grid>
                    <Grid item xs={10} marginTop={4}>
                      <TextField
                        fullWidth
                        label="FULLNAME"
                        id="fullname"
                        value="name"
                      />
                    </Grid>
                    <Grid item xs={5} marginTop={4}>
                      <TextField
                        fullWidth
                        label="FULLNAME"
                        id="fullname"
                        value="name"
                      />
                    </Grid>
                    <Grid item xs={5} marginTop={4}>
                      <TextField
                        fullWidth
                        label="FULLNAME"
                        id="fullname"
                        value="name"
                      />
                    </Grid>
                    <Grid item xs={5} marginTop={4}>
                      <TextField
                        fullWidth
                        label="FULLNAME"
                        id="fullname"
                        value="name"
                      />
                    </Grid>
                    <Grid item xs={5} marginTop={4} marginBottom={4}>
                      <TextField
                        fullWidth
                        label="FULLNAME"
                        id="fullname"
                        value="name"
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} className="bg-dark-form mt-4 w-11/12 mx-auto">
                <Typography
                  marginTop={4}
                  marginLeft={4}
                  variant="h6"
                  className="text-yellow-600">
                  {' '}
                  PAYMENT OPTION
                </Typography>
                <FormControl className="w-9/12 ml-10">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    // value={value}
                    // onChange={handleChange}
                  >
                    <Grid container alignItems={'center'} className="mt-6">
                      <Grid item xs={'auto'}>
                        <FormControlLabel
                          className="text-white mt-0 "
                          value="cash"
                          control={
                            <Radio disableRipple style={{ color: '#c49246' }} />
                          }
                          label="Pay directly at the table"
                        />
                      </Grid>
                      <Grid item xs={3} marginBottom={0}>
                        <PaymentsIcon
                          fontSize="large"
                          style={{ color: '#c49246' }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems={'center'} className="mt-4">
                      <Grid item xs={'auto'}>
                        <FormControlLabel
                          className="text-white"
                          value="atm"
                          control={
                            <Radio disableRipple style={{ color: '#c49246' }} />
                          }
                          label="Pay via international and domestic card (ATM)"
                        />
                      </Grid>
                      <Grid item xs={3} marginBottom={0}>
                        <CreditCardIcon
                          fontSize="large"
                          style={{ color: '#c49246' }}
                        />
                      </Grid>
                    </Grid>

                    <FormControlLabel
                      className="text-white mt-4 mb-4"
                      value="momo"
                      control={
                        <Radio disableRipple style={{ color: '#c49246' }} />
                      }
                      label="Pay via momo"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={5}
            marginLeft={4}
            className="order-detail bg-dark-form h-full p-0">
            <Typography marginLeft={4} variant="h6" className="text-yellow-600">
              ORDER DETAIL
            </Typography>
            <Grid container rowSpacing={4} marginTop={1}>
              <Grid item xs={12}>
                <OrderItem />
              </Grid>
              <Grid item xs={12}>
                <OrderItem />
              </Grid>
              <Grid item xs={12}>
                <OrderItem />
              </Grid>
              <Grid item xs={12}>
                <OrderItem />
              </Grid>
            </Grid>
            <div className={styles.two0line}></div>
            <Grid container className="w-10/12 mx-auto mt-4 text-white">
              <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={6}>
                    <Typography variant="h5"> Calculate</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h4"
                      style={{ color: '#CA8A04' }}
                      textAlign={'right'}>
                      11.000.000 VND
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={6}>
                    <Typography variant="h5"> Reduce</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h4"
                      style={{ color: '#CA8A04' }}
                      textAlign={'right'}>
                      0 VND
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={6}>
                    <Typography variant="h5"> VAT</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h4"
                      style={{ color: '#CA8A04' }}
                      textAlign={'right'}>
                      1.000.000 VND
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className={styles.two0line}></div>
            <Grid container className="w-10/12 mx-auto mt-4">
              <Grid item xs={6}>
                <Typography variant="h5" className="text-white font-bold">
                  TOTAL
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h4"
                  style={{ color: '#CA8A04' }}
                  textAlign={'right'}>
                  12.000.000 VND
                </Typography>
              </Grid>
            </Grid>
            <Grid container className="mt-10">
              <Grid item xs={12} className="mb-8">
                <Button
                  variant="contained"
                  className={styles.payBtn}
                  sx={{
                    ml: 1,
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: '#c49246',
                    },
                  }}>
                  <Typography variant="h5"> PAYMENT </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

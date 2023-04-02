import React from "react";
import { FormControl, RadioGroup, Radio, Grid, FormControlLabel, Typography } from "@mui/material";
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function PaymentType(){
    return (
        <div className="">
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
        </div>
    )
}
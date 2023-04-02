import React from "react";
import { useAppDispatch } from "@/hooks";
import { setOrderType } from "@/store/reducer/order";
import { Typography, FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { OrderType } from "@/types/data-types";

type Props = {
    orderType: OrderType;
};

export default function OrderTypePayment(props: Props){
    const dispatch = useAppDispatch();
    const { orderType } = props
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setOrderType((event.target as HTMLInputElement).value))
    }
    return(
        <div className="p-4">
            <Typography variant='h6' className='text-yellow-600 font-bold'>
                PICK A WAY ENJOY FOR MEAL
            </Typography>
            <div className="pt-4">
                <FormControl className="w-9/12">
                    <RadioGroup
                    aria-labelledby="order-select"
                    name="order-select"
                    value={orderType}
                    onChange={handleChange}
                    >
                        <div className="flex flex-col gap-4 justify-center">
                            <FormControlLabel
                                className="text-white mt-0 "
                                value={OrderType.DINE_IN}
                                control={
                                <Radio disableRipple style={{ color: '#c49246' }} />
                                }
                                label={OrderType.DINE_IN}
                            />

                            <FormControlLabel
                                className="text-white"
                                value={OrderType.TAKEAWAY}
                                control={
                                <Radio disableRipple style={{ color: '#c49246' }} />
                                }
                                label={OrderType.TAKEAWAY}
                            />                                                                
                        </div>
                        
                    </RadioGroup>
                </FormControl>
            </div>

        </div>
    )
}
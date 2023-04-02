import React from "react";
import { Typography, Button } from "@mui/material";
import OrderItem from "./order-item";
import styles from './styles.module.scss'
import { CartItem, OrderType, IReservationData } from "@/types/data-types";
import { formatCurrency } from "@/utils/currency-format";


interface IOrder  {
    itemList: CartItem[];
    type: OrderType;
    totalCost: number;
    reservation: IReservationData[];
}
type Props = {
    orderInfo: IOrder
};

export default function OrderDetailPayment(props: Props){
    const { orderInfo } = props
    return(
        <div className="order-detail bg-[#2D2D2D] h-full p-0">
            <Typography marginLeft={4} variant="h6" className="text-yellow-600 mt-8">
              ORDER DETAIL
            </Typography>
            <div className="flex flex-col gap-6 mt-4">
                {orderInfo.itemList.map((item) => (
                    <OrderItem item={item} key={item.name}/>
                ))}
            </div>
            <div className={styles.two0line}></div>
            <div className="flex flex-col w-10/12 mx-auto mt-4 text-white">
                <div className="flex flex-row justify-between">
                    <Typography variant="h5"> Calculate</Typography>
                    <Typography
                      variant="h4"
                      style={{ color: '#CA8A04' }}
                      textAlign={'right'}>
                        {formatCurrency(orderInfo.totalCost)}
                    </Typography>
                </div>
                <div className="flex flex-row justify-between">
                    <Typography variant="h5"> Reduce </Typography>
                    <Typography
                      variant="h4"
                      style={{ color: '#CA8A04' }}
                      textAlign={'right'}>
                        0 VND
                    </Typography>
                </div>
                <div className="flex flex-row justify-between">
                    <Typography variant="h5"> VAT </Typography>
                    <Typography
                      variant="h4"
                      style={{ color: '#CA8A04' }}
                      textAlign={'right'}>
                        {formatCurrency(orderInfo.totalCost)}
                    </Typography>
                </div>
            </div>
            <div className={styles.two0line}></div>
            <div className="flex flex-row justify-between w-10/12 mx-auto mt-4">
                <Typography variant="h5" className="text-white font-bold">
                  TOTAL
                </Typography>
                <Typography
                  variant="h4"
                  style={{ color: '#CA8A04' }}
                  textAlign={'right'}>
                  {formatCurrency(orderInfo.totalCost)}
                </Typography>
            </div>
            <div className="flex justify-center items-center mt-4 mb-8">
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
            </div>
        </div>
    )
}
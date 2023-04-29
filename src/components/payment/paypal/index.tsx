import React, { useState, useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { CreatedOrder, PaymentStatus, PaymentType, PaypalUnit } from '@/types/data-types';
import { toast } from 'react-toastify';
import { useCreatePaidOrderServiceMutation } from '@/service/order';
import { useAppDispatch , useAppSelector} from '@/hooks';
import { selectCreatedOrder, createOrderThunk, reset, setPaymentType } from '@/store/reducer/order';

type Props = {
  order: any;
};
const Checkout = (props: Props) => {
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const { order } = props;
  const createdOrder = useAppSelector(selectCreatedOrder);
  const [paidOrder, paidRes] = useCreatePaidOrderServiceMutation();
  // creates a paypal order
  const dispatch = useAppDispatch();
  const createOrder = (data: any, actions: any) => {
    const paypalUnit : PaypalUnit[] = [];
    if (order.data.itemList){
      order.data.itemList.forEach(item => {
        paypalUnit.push({
          reference_id: item.id,
          description: item.name,
          amount: {
            currency_code: "USD",
            value: item.price/20000
          }
        })
      })
      
    }
    dispatch(setPaymentType(PaymentType.CREDIT));
    dispatch(createOrderThunk());
    return actions.order
      .create({
        purchase_units: paypalUnit,
        application_context: {
          shipping_preference: "NO_SHIPPING"
        }
      })
      .then((orderID: any) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      console.log(order);
      console.log(details)
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (error: any) => {
    toast.error(error);
  };

  useEffect(() => {
    if (success) {
      toast.success('Payment with Paypal successfully!')
      console.log(createdOrder);
      const payment : CreatedOrder = {
        id: createdOrder.id,
        type: order.data.type,
        paymentStatus: PaymentStatus.PAID,
        paymentData: {
          type: PaymentType.CREDIT,
          info: {
            totalCost: order.data.totalCost,
            totalPay: order.data.totalCost,
          }
        }
      }
      paidOrder(payment)
      console.log(paidRes);
      console.log('Order successful . Your order id is--', createdOrder.id);
      window.location.href = '/payment-success';
    }
  }, [success]);

  return (
    <div className="paypal-button">
      
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
    </div>
  );
};

export default Checkout;

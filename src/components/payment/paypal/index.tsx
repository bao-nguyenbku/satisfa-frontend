import React, { useState, useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import {
  CreatedOrder,
  PaymentStatus,
  PaymentType,
  PaypalUnit,
  PayPalScriptOptions,
} from '@/types';
import { toast } from 'react-toastify';
import { useCreatePaidOrderServiceMutation } from '@/services/order';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectCreatedOrder,
  createOrderThunk,
  setPaymentType,
} from '@/store/reducer/order';

const paypalScriptOptions: PayPalScriptOptions = {
  'client-id': process.env.NEXT_PUBLIC_CLIENT_ID as string,
  currency: 'USD',
};
type Props = {
  order: any;
};
const Checkout = (props: Props) => {
  const [success, setSuccess] = useState(false);
  const [, setOrderId] = useState(false);
  const { order } = props;
  const createdOrder = useAppSelector(selectCreatedOrder);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paidOrder, paidRes] = useCreatePaidOrderServiceMutation();
  // creates a paypal order
  const dispatch = useAppDispatch();
  const createOrder = (data: any, actions: any) => {
    const paypalUnit: PaypalUnit[] = [];
    if (order.data.itemList) {
      order.data.itemList.forEach((item: any) => {
        paypalUnit.push({
          reference_id: item.id,
          description: item.name,
          amount: {
            currency_code: 'USD',
            value: item.price / 20000,
          },
        });
      });
    }
    dispatch(setPaymentType(PaymentType.CREDIT));
    dispatch(createOrderThunk());
    return actions.order
      .create({
        purchase_units: paypalUnit,
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID: any) => {
        setOrderId(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    /**
     * data: {
     *   orderID: string;
     *   payerID: string;
     *   paymentID: string | null;
     *   billingToken: string | null;
     *   facilitatorAccesstoken: string;
     * }
     */
    return actions.order.capture().then(function () {
      // const { payer } = details
      setSuccess(true);
    });
  };

  // capture likely error
  const onError = (error: any) => {
    toast.error(error);
  };

  useEffect(() => {
    if (success) {
      toast.success('Payment with Paypal successfully!');
      const payment: CreatedOrder = {
        id: createdOrder.id,
        type: order.data.type,
        paymentStatus: PaymentStatus.PAID,
        paymentData: {
          type: PaymentType.CREDIT,
          info: {
            totalCost: order.data.totalCost,
            totalPay: order.data.totalCost,
          },
        },
      };
      paidOrder(payment);
      window.location.href = '/payment-success';
    }
  }, [success]);

  return (
    <PayPalScriptProvider options={paypalScriptOptions}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default Checkout;

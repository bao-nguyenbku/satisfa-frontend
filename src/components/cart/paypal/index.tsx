import React, { useState, useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CreatePayment, Order, PaymentType, PaypalUnit } from '@/types/data-types';
import { toast } from 'react-toastify';
import { usePaidOrderServiceMutation } from '@/services/order';
type Props = {
  order: Order;
};
const Checkout = (props: Props) => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [orderID, setOrderID] = useState(false);
  const { order } = props;
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [paidOrder, paidOrderRes] = usePaidOrderServiceMutation();

  // creates a paypal order

  
  const createOrder = (data: any, actions: any) => {
    const paypalUnit : PaypalUnit[] = [];
    if (order.items){
      order.items.forEach(item => {
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
      const { payer } = details;
      console.log(details)
      console.log(payer);
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (error: any) => {
    setErrorMessage('An Error occured with your payment ');
    toast.error(error);
  };

  useEffect(() => {
    if (success) {
      toast.success('Payment with Paypal successfully!')
      const payment : CreatePayment = {
        orderId: order.id,
        type: PaymentType.CREDIT,
        info: {
          totalCost: order.totalCost,
          totalPay: order.totalCost
        }
      }
      paidOrder(payment)
      console.log('Order successful . Your order id is--', orderID);
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

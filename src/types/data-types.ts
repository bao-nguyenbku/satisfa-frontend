import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { ReactNode } from 'react';

export { QueryStatus };

export type ReservationType = {
  customerId: string;
  tableId: string;
  date: string;
  numberOfGuests: number;
  note: string;
};

export type User = {
  id: string;
  email: string;
  fullname: string;
  avatar: string;
};

export type CreateUser = {
  email: string;
  fullname: string;
  password: string;
};

export type ChatBotType = {
  re_type: string;
};

export type CreateReservation = {
  customerId: User;
  tableId: string;
  date: string;
  numberOfGuests: number;
  note: string;
};

export type ReservationFilter = {
  date?: string;
  user?: string;
};

export type TableType = {
  _id: string;
  id: string;
  code: string;
  numberOfSeats: number;
  status: TableStatus;
};

export type TableFilter = {
  minSeat?: number;
  reservationDate?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  visible: boolean;
};

export type CartItem = Product & {
  qty: number;
};

export type ReduxDataType = {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
  error: ErrorType | any;
};

export type ErrorType = {
  statusCode: number;
  message: string;
  path?: string;
  type?: string;
};

export enum TableStatus {
  FREE = 'FREE',
  CHECKED_IN = 'CHECKED_IN',
  RESERVED = 'RESERVED',
}

export enum OrderType {
  DINE_IN = 'DINE_IN',
  TAKEAWAY = 'TAKEAWAY',
}

export enum PaymentType {
  CASH = 'CASH',
  CREDIT = 'CREDIT',
  E_WALLET = 'E_WALLET',
}

export type PaymentCash = {
  totalPay: number;
  totalCost: number;
};
export type PaidOrderType = {
  type: PaymentType;
  info: PaymentCash;
};

export type CreatedOrder = {
  id: string;
  type: OrderType;
  paymentData: PaidOrderType;
};

export enum OrderStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  COMPLETE = 'COMPLETE',
}
export type OrderFilter = {
  status?: OrderStatus;
};
export type TakeawayCustomer = {
  name: string;
  phone: string;
  takingTime: string;
};
export type CreateOrder = Omit<
  Order,
  | 'id'
  | 'totalItem'
  | 'paymentStatus'
  | 'status'
  | 'customerId'
  | 'reservationId'
  | 'createdAt'
> & {
  reservationId?: string;
  customerId?: string;
  tempCustomer?: TakeawayCustomer;
};

export type Order = {
  id: string;
  totalCost: number;
  type: OrderType;
  totalItem: number;
  paymentStatus: string;
  status: string;
  customerId: User;
  reservationId: Reservation;
  items: CartItem[];
  createdAt: string;
};

export type Table = {
  id: string;
  code: string;
  numberOfSeat: number;
  reservations: Reservation[];
};

export type Reservation = {
  id: string;
  customerId: User;
  tableId: Table;
  date: string;
  numberOfGuests: number;
  note: string;
};

export type CreatePayment = {
  orderId: string;
  info: PaymentCash;
  type: PaymentType;
};

export type PaypalUnit = {
  reference_id: string;
  description: string;
  amount: PaypalAmount;
}


export type PaypalAmount = {
  currency_code: string;
  value: number; 
}

export type BotStep = {
  [key: number]: {
    text: ReactNode;
    isComplete: boolean;
  };
};

import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { ReactNode } from 'react';

export { QueryStatus };

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

export type CreateReservation = Omit<Reservation, 'id' | 'customerId' | 'tableId'> & {
  customerId: string;
  tableId: string;
}


export type ReservationFilter = {
  date?: string;
  user?: string;
  currentDate?: boolean;
  currentUser?: boolean;
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

export type Review = {
  id: string;
  customerId: Omit<User, 'id' | 'email'>;
  foodRating: number;
  serviceRating: number;
  review: string;
};
export type ReviewFilter = {
  limit?: number;
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

export enum PaymentStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
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
  paymentStatus: PaymentStatus;
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
  phone: number;
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
  type: OrderType;
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
  numberOfSeats: number;
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
};

export type PaypalAmount = {
  currency_code: string;
  value: number;
};

interface PayPalScriptQueryParameters {
  'client-id': string;
  'merchant-id'?: string;
  currency?: string;
  intent?: string;
  commit?: boolean;
  vault?: boolean | string;
  components?: string;
  'disable-funding'?: string;
  'enable-funding'?: string;
  'disable-card'?: string;
  'integration-date'?: string;
  debug?: boolean | string;
  'buyer-country'?: string;
  locale?: string;
}

interface PayPalScriptDataAttributes {
  'data-partner-attribution-id'?: string;
  'data-csp-nonce'?: string;
  'data-order-id'?: string;
  'data-page-type'?: string;
  'data-client-token'?: string;
}

export interface PayPalScriptOptions extends PayPalScriptQueryParameters, PayPalScriptDataAttributes {
  [key: string]: string | boolean | undefined;
  sdkBaseURL?: string;
}
export type BotStep = {
  [key: number]: {
    isComplete: boolean;
  };
};

export type BotMessage = {
  [key: number]: {
    text: ReactNode;
  };
};

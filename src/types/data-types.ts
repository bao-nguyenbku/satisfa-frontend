import { QueryStatus } from '@reduxjs/toolkit/dist/query';

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

export interface ICreateReservation {
  customerId: IUser;
  tableId: string;
  date: string;
  numberOfGuests: number;
  note: string;
}

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

export interface IProductData {
  name: string;
  description: string;
  category: string;
  price: number;
  images: Array<any>;
  visible: boolean;
}

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
  customerId: IUser;
  reservationId: IReservationData;
  items: CartItem[];
  createdAt: string;
};

export interface ITable {
  id: string;
  code: string;
  numberOfSeat: number;
  reservations: IReservationData[];
}
export interface IUser {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
}

export interface IReservationData {
  id: string;
  customerId: IUser;
  tableId: ITable;
  date: string;
  numberOfGuests: number;
  note: string;
}

export type BotStep = {
  [key: number]: {
    text: string;
    isComplete: boolean;
  };
};

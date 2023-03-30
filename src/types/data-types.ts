export type ReservationType = {
  customerId: string;
  tableId: string;
  date: string;
  numberOfGuests: number;
  note: string
};


export type User = {
  id: string;
  email: string;
  fullname: string;
};

export type CreateUser = {
  email: string;
  fullname: string;
  password: string;
};

export type ChatBotType = {
  re_type: string;
};




export type TableType = {
  _id: string;
  id: string;
  code: string;
  numberOfSeats: number;
  status: TableStatus;
}

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
export enum OrderStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  COMPLETE = 'COMPLETE',
}
export type OrderFilter = {
  status?: OrderStatus
}
export type Order = {
  id: string;
  totalCost: number;
  totalItem: number;
  paymentStatus: string;
  status: string;
  customerId: IUser;
  reservationId: IReservationData;
  items: CartItem[];
  type: OrderType;
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

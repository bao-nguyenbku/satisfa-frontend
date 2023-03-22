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
};

export enum TableStatus {
  FREE = 'FREE',
  CHECKED_IN = 'CHECKED_IN',
  RESERVED = 'RESERVED',
}

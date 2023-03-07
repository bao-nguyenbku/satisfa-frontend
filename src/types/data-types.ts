export type ReservationType = {
  customerId: string;
  tableId: string;
  date: string;
  numberOfGuest: number;
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
  owner: string;
  table: string;
  from: Date;
  to: Date;
  numberOfGuest: number;
};

export type ChatBotType = {
  re_type: string;
};



export type TableType = {
  id: string;
  code: string;
  numberOfSeat: number;
  status: "empty" | "";
}

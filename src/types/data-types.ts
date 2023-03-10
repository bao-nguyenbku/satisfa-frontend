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
};

export type ChatBotType = {
  re_type: string;
};




export type TableType = {
  _id: string;
  id: string;
  code: string;
  numberOfSeat: number;
  status: "checkedin" | "free" | "reserved";
}

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  price: number;
};


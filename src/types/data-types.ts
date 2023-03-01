export type Reservation = {
    id: string;
    owner: string;
    table: string;
    from: Date;
    to: Date;
    numberOfGuest: number;
  }
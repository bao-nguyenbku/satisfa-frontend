export type Reservation = {
    id: string;
    owner: string;
    table: string;
    from: Date;
    to: Date;
    numberOfGuest: number;
  }

export type ChatBotType = {
  re_type: string;
}
export type Message = {
  id: number;
  text: string;
  role: 'bot' | 'user' | 'widget';
  component?: React.ReactNode;
  isNew: boolean;
};
export type MessageOption = {
  delay?: number;
  widget?: string;
};

export enum BotService {
  RESERVATION = 'RESERVATION',
  ORDER = 'ORDER',
  NONE = 'NONE',
}

export const DEFAULT_DELAY = 500;
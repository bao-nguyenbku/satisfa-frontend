import { ReactElement, ReactNode } from 'react';

export enum WidgetType {
  WIDGET = 'WIDGET',
  SELECTION = 'SELECTION',
}

export type Message = {
  id: number;
  text: ReactNode;
  role: 'bot' | 'user' | 'widget';
  component?: React.ReactNode;
  isNew: boolean;
};
export type MessageOption = {
  delay?: number;
  widget?: ReactElement;
  widgetType?: WidgetType;
};
export type BotActions = {
  [key: string]: (params?: any, options?: MessageOption) => void;
};

export enum BotService {
  RESERVATION = 'RESERVATION',
  ORDER = 'ORDER',
  NONE = 'NONE',
}

export const DEFAULT_DELAY = 500;

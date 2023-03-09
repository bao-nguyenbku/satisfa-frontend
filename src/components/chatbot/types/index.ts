import { IMessageOptions } from 'react-chatbot-kit/src/interfaces/IMessages';
import IConfig from 'react-chatbot-kit/src/interfaces/IConfig';

export type CreateChatBotMessage = (
  message: string,
  options: IMessageOptions
) => {
  loading: boolean;
  widget?: string;
  delay?: number;
  payload?: any;
  message: string;
  type: string;
  id: number;
};
export type CreateClientMessage = (
  message: string,
  options: IMessageOptions
) => {
  loading?: boolean;
  widget?: string;
  delay?: number;
  payload?: any;
  message: string;
  type: string;
  id: number;
};
export type CreateCustomMessage = (
  message: string,
  type: string,
  options: IMessageOptions
) => {
  loading?: boolean;
  widget?: string;
  delay?: number;
  payload?: any;
  message: string;
  type: string;
  id: number;
};

export type ChatbotState = {
  messages: string[];
};

export interface ICustomConfig extends IConfig {}

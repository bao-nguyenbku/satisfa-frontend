import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import Options from './options';
import MessageParser from './message-parser';
import DineIn from './components/dine-in/DineIn';
import CheckEmptyTable from './components/Table/CheckEmptyTable';
import IConfig from 'react-chatbot-kit/src/interfaces/IConfig';
import MessageHeader from '@/components/mesage-box/message-header';
import GuestMessageItem from '../mesage-box/guest-message-item';
import MeMessageItem from '../mesage-box/me-message-item';
import { ICustomConfig } from './types';

const config: ICustomConfig = {
  botName: 'FoodBot',
  initialMessages: [
    createChatBotMessage(`Hey! I'm Satisgi, super bot of Satisfa.`, {}),
    createChatBotMessage('How can I help you today?', {
      delay: 500,
      widget: 'options',
    }),
  ],
  customComponents: {
    userAvatar: () => <></>,
    botAvatar: () => <></>,
    header: (props) => <MessageHeader {...props} />,
    botChatMessage: (props) => <GuestMessageItem {...props} />,
    userChatMessage: (props) => <MeMessageItem {...props} />,
  },
  widgets: [
    {
      widgetName: 'options',
      widgetFunc: (props) => <Options {...props} />,
      props: null,
      mapStateToProps: [],
    },
    {
      widgetName: 'dineIn',
      widgetFunc: (props) => <DineIn {...props} />,
      props: null,
      mapStateToProps: [],
    },
    {
      widgetName: 'checkEmptyTable',
      widgetFunc: (props) => <CheckEmptyTable {...props} />,
      mapStateToProps: [''],
      props: null,
    },
    // {
    //   widgetName: 'messageParser',
    //   widgetFunc: (props) => <MessageParser {...props} />,
    //   mapStateToProps: ['gist'],
    //   props: null,
    // },
    // {
    //   widgetName: "actionProviderDocs",
    //   widgetFunc: (props) => <ActionProviderDocs {...props} />,
    //   mapStateToProps: ["gist"],
    // },
  ],
};

export default config;

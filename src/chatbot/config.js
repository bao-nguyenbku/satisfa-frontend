import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "./components/options"
import UserAvatar from './components/UserAvatar'

import DineIn from "./components/dine-in/DineIn";
import CheckEmptyTable from "./components/Table/CheckEmptyTable";


const config = {
    botName: "FoodBot",
    initialMessages: [
        createChatBotMessage(`Hey! I'm Satisgi, super bot of Satisfa.`),
        createChatBotMessage(
          "How can I help you today?",
          {
            delay: 500,
            widget: "options",
          }
        ),
    ],
    lang: "no",
    customComponents: {
      userAvatar: (props)=> <UserAvatar {...props} />
    },
    customStyles: {
      botMessageBox: {
        backgroundColor: '#376B7E',
      },
      chatButton: {
        backgroundColor: '#5ccc9d',
      },
    },
    widgets: [
        {
          widgetName: "options",
          widgetFunc: (props) => <Options {...props} /> ,
        },
        {
          widgetName: "dineIn",
          widgetFunc: (props) => <DineIn {...props} /> ,
        },
        {
          widgetName: "checkEmptyTable",
          widgetFunc: (props) => <CheckEmptyTable {...props} /> ,
          mapStateToProps: [
          "fromtime", 
          "toTime", 
          "customerAmount"],

        },
        {
          widgetName: "messageParser",
          widgetFunc: (props) => <MessageParser {...props} />,
          mapStateToProps: ["gist"],
        },
        {
          widgetName: "actionProviderDocs",
          widgetFunc: (props) => <ActionProviderDocs {...props} />,
          mapStateToProps: ["gist"],
        },
      ],
      state: {
        fromTime: "",
        toTime: "",
        emptyTable: [],
        customerAmount: 0,
        cuisineType: 0,
      },
  }

  export default config;
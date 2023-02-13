import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./components/options"

const config = {
    botName: "FoodBot",
    initialMessages: [
        createChatBotMessage(`Hello world`, {
            widget: "options"
        })
    ],
    lang: "no",
    widgets: [
        {
          widgetName: "options",
          widgetFunc: (props) => <Options {...props} />,
          mapStateToProps: ["gist"],
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
        cuisineType: "",
        categoryType: "",
        restaurants: [],
        latitude: -36.8483,
        longitude: 174.7626,
      },
  }

  export default config;
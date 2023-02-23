import { Box } from "@mui/material";
import React from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';

import ActionProvider from "../../chatbot/ActionProvider";
import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import  styles from './styles.module.scss'


// const saveMessages = (messages) => {
//     // localStorage.setItem("chat_messages", JSON.stringify(messages));
//   };
  
// const loadMessages = () => {
// // const messages = JSON.parse(localStorage.getItem("chat_messages"));
// // return messages;
// };

export default function ChatBotArea(){
    
    return(
        <div className={styles.chatInner}>
            <Chatbot
            config={config}
            actionProvider={ActionProvider}
            // messageHistory={loadMessages()}
            messageParser={MessageParser}
            // saveMessages={saveMessages}
        />
        </div> 
    );
};
import { Box } from "@mui/material";
import React from "react";
import Chatbot from "react-chatbot-kit";

import ActionProvider from "../../chatbot/ActionProvider";
import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";

const saveMessages = (messages) => {
    // localStorage.setItem("chat_messages", JSON.stringify(messages));
  };
  
const loadMessages = () => {
// const messages = JSON.parse(localStorage.getItem("chat_messages"));
// return messages;
};

export default function ChatBotArea(){

    return(

                <Box className="styled-chat" style={{maxWidth: "300px"}}>
                    <Chatbot
                    config={config}
                    actionProvider={ActionProvider}
                    messageHistory={loadMessages()}
                    messageParser={MessageParser}
                    saveMessages={saveMessages}
                />
                </Box>
        
    );
};
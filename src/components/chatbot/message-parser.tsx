import React from 'react';
import ActionProvider from './action-provider';

type Props = any;

const MessageParser = (props: Props) => {
  const { children, actions } = props;

  const parse = (message: string) => {
    let parseMessage = message.split('_')
    switch(parseMessage[0]){
      case "reservation":
        actions.handleNavigateToReservation();
        break;
      case "table":
        if (parseMessage[1] == "getDate"){
          actions.handleShowTimePicker();
        }
      default:
        actions.unhandledInput();
        break;
    }
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </>
  );
};

export default MessageParser;

import React from 'react';
// import ActionProvider from './action-provider';

type Props = any;

const MessageParser = (props: Props) => {
  const { children, actions } = props;

  const parse = (message: string) => {
    if (message.includes('reservation')) {
      actions.handleNavigateToReservation();
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

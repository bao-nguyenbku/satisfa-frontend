import React, { ReactElement, cloneElement } from 'react';
import MeMessageItem from './me-message-item';
import GuestMessageItem from './guest-message-item';
import TypingIndicator from '../chatbot/typing-indicator';
import { Message } from '../chatbot/types';

type Props = {
  messages?: Message[];
  isTyping?: boolean;
};
const MessageSection = (props: Props) => {
  const { messages, isTyping } = props;
  return (
    <div className="w-full flex flex-col gap-6 px-2 mt-auto">
      {messages &&
        messages.map((payload) => {
          if (payload.role === 'user') {
            return <MeMessageItem key={payload.id} message={payload.text} />;
          }
          if (payload.role === 'bot') {
            return <GuestMessageItem key={payload.id} message={payload.text} />;
          }
          if (payload.role === 'widget') {
            return (
              <div key={payload.id}>
                {cloneElement(payload?.component as ReactElement, {
                  ...props,
                })}
              </div>
            );
          }
        })}
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default MessageSection;

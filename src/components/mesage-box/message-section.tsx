import React from 'react';
import MeMessageItem from './me-message-item';
import GuestMessageItem from './guest-message-item';
import TypingIndicator from '../typing-indicator';

import { MessagePayload } from '.';
type Props = {
  messages?: MessagePayload[];
  isTyping?: boolean;
};
const MessageSection = (props: Props) => {
  const { messages, isTyping } = props;
  return (
    <div className="w-full flex flex-col gap-6 px-2">
      {messages &&
        messages.map((payload) => {
          if (payload.user === 'me') {
            return <MeMessageItem key={Math.random()} message={payload.message} />;
          }
          if (payload.user === 'satisgi') {
            return <GuestMessageItem key={Math.random()} message={payload.message} />
          }
        })}
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default MessageSection;

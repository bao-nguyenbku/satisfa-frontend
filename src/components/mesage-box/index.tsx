import React from 'react';
import Chatbot from '@/components/chatbot';
import { nunito } from '@/constants/font';

export interface MessagePayload {
  user: string;
  message: string;
}

type Props = {
  boxOpen?: boolean;
};
const MessageBox = (props: Props) => {
  return (
    <div
      className={`w-full h-full rounded-none overflow-hidden flex flex-col z-20 ${nunito.className}`}>
      <Chatbot {...props} />
    </div>
  );
};

export default MessageBox;

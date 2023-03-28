import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Socket } from 'socket.io-client';
import { KeyDownEvent } from '@/types/event-types';
import { MessagePayload } from '.';
import { IconButton } from '@mui/material';

type Props = {
  socket?: Socket;
  setMessagesSection?: React.Dispatch<React.SetStateAction<MessagePayload[]>>;
  onGetMessage?: (message: string) => void;
};

const MessageInput = (props: Props) => {
  const [text, setText] = useState('');
  const { onGetMessage } = props;
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onSubmit = () => {
    if (onGetMessage) {
      setText('');
      onGetMessage(text);
    }
  };
  const handleKeyPress = (e: KeyDownEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  return (
    <div className="w-full flex items-center px-3 gap-2 bg-white/20 h-14 rounded-full">
      <input
        className="flex-1 focus:outline-none h-full text-white bg-transparent placeholder:text-white/60"
        placeholder="Aa"
        value={text}
        onChange={handleChangeText}
        onKeyDown={handleKeyPress}
      />
      <IconButton className="hover:bg-white/30" onClick={onSubmit}>
        <SendIcon className="text-white" />
      </IconButton>
    </div>
  );
};

export default MessageInput;

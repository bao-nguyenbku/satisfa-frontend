import React, { useRef, useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Socket } from 'socket.io-client';
import { KeyDownEvent } from '@/types/event-types';
import { MessagePayload } from '../mesage-box';
import { IconButton } from '@mui/material';

type Props = {
  socket?: Socket;
  setMessagesSection?: React.Dispatch<React.SetStateAction<MessagePayload[]>>;
  onGetMessage?: (message: string) => void;
  isTyping?: boolean;
};

const MessageInput = (props: Props) => {
  const [text, setText] = useState('');
  const { onGetMessage, isTyping } = props;
  const inputRef = useRef<HTMLInputElement>(null);
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
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [text, isTyping, inputRef])
  return (
    <div className="w-full flex items-center px-3 gap-2 bg-white/10 h-14 rounded-full">
      <input
        className="flex-1 focus:outline-none h-full text-white bg-transparent placeholder:text-white/60 text-xl"
        placeholder="Aa"
        autoFocus
        disabled={isTyping}
        value={text}
        ref={inputRef}
        onChange={handleChangeText}
        onKeyDown={handleKeyPress}
      />
      <IconButton
        className="hover:bg-white/30 disabled:text-gray-500 text-white"
        onClick={onSubmit}
        disabled={isTyping}>
        <SendIcon className="text-inherit" />
      </IconButton>
    </div>
  );
};

export default MessageInput;

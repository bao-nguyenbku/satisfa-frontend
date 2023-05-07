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
  boxOpen?: boolean;
};

const isDisaleInput = (...condition: any[]) => {
  if (condition.some((cond) => Boolean(cond) === true)) return true;
  return false;
};
const MessageInput = (props: Props) => {
  const [text, setText] = useState('');
  const { onGetMessage, isTyping, boxOpen } = props;
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
    if (text === '') return;
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [text, isTyping, inputRef, boxOpen]);
  return (
    <div
      className={`w-full flex items-center px-3 gap-2 ${
        isDisaleInput(isTyping) ? 'bg-primary-dark' : 'bg-white/10'
      } h-14 rounded-full`}>
      <input
        className={`flex-1 focus:outline-none h-full text-white bg-transparent ${
          isDisaleInput(isTyping)
            ? 'placeholder:text-gray-700'
            : 'placeholder:text-white/60'
        }`}
        placeholder="Aa"
        autoFocus
        disabled={isDisaleInput(isTyping)}
        value={text}
        ref={inputRef}
        onChange={handleChangeText}
        onKeyDown={handleKeyPress}
      />
      <IconButton
        className="hover:bg-white/30 disabled:text-gray-700 text-white"
        onClick={onSubmit}
        disabled={isDisaleInput(isTyping) || text === ''}>
        <SendIcon className="text-inherit" />
      </IconButton>
    </div>
  );
};

export default MessageInput;

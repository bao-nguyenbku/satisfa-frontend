import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import styles from './styles.module.scss';
import { Socket } from 'socket.io-client';
import { KeyDownEvent } from '@/types/event-types';
import { MessagePayload } from '.';



type Props = {
  socket?: Socket;
  setMessagesSection?: React.Dispatch<React.SetStateAction<MessagePayload[]>>;
};

const MessageInput = (props: Props) => {
  const [text, setText] = useState('');
  const { socket, setMessagesSection } = props;
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onSubmit = () => {
    const myMessage = {
      message: text,
      user: 'me',
    };
    if (setMessagesSection) {
      setMessagesSection((prev) => {
        return [...prev, myMessage];
      });
    }
    socket?.emit('chat', myMessage);
  };
  const handleKeyPress = (e: KeyDownEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
      setText('');
    }
  };
  return (
    <div className="w-full flex items-center px-3 gap-2">
      <input
        className="flex-1 focus:outline-none bg-white/20 h-14 rounded-full px-2 text-white"
        placeholder="Aa"
        value={text}
        onChange={handleChangeText}
        onKeyDown={handleKeyPress}
      />
      <button className="bg-dark-2 h-14 w-14 rounded-full border-gray-600 border">
        <SendIcon
          sx={{
            color: '#fff',
          }}
        />
      </button>
    </div>
  );
};

export default MessageInput;

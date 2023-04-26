import React from 'react';
import BotAvatar from '../common/bot-avatar/avatar';

const MessageHeader = () => {
  return (
    <div className="w-full h-16 bg-primary-dark flex items-center px-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <BotAvatar />
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
        <span className="text-white font-bold">Satisgi</span>
      </div>
    </div>
  );
};

export default MessageHeader;

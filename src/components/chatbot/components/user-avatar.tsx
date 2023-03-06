import React from 'react';
import { Avatar } from '@mui/material';

export default function UserAvatar() {
  return (
    <Avatar
      className='w-[var(--react-chatbot-kit-avatar-size)] h-[var(--react-chatbot-kit-avatar-size)]'
      alt="Remy Sharp"
      src="https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600"
    />
  );
}

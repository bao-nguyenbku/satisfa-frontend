import React from 'react';
import { BotMessage } from '@/types';

export const botReserveMessage: BotMessage = {
  1: {
    text: (
      <span>
        First, let you pick a date for your meal. Please type with syntax:
        DD/MM/YYYY
      </span>
    ),
  },
  2: {
    text: <span>What time can you arrive? Please type with syntax: hh:mm</span>,
  },
  3: {
    text: (
      <span>How many guests you will go with? Please type a number</span>
    ),
  },
  4: {
    text: (
      <span>
        Now, we will show you availables table that match your requirement on
        the screen, or you can choose a table on chat screen.
      </span>
    ),
  },
};

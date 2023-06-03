import React from 'react';
import { BotMessage } from '@/types';

export const botRecommendationMessage: BotMessage = {
  1: {
    text: (
      <span>
        There are best seller in our system.
      </span>
    ),
  },
  2: {
    text: <span>Do you want to see more in your lastest order? Type <strong>yes</strong> or <strong>no</strong> to make your choice.</span>,
  },
  3: {
    text: (
      <span>Thank you for using our service.</span>
    ),
  },
};

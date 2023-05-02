import React from 'react';
import { BotMessage } from '@/types/data-types';

export const botOrderMessage: BotMessage = {
  1: {
    text: (
      <span>
        Of course! I showed you the menu on the screen. <br /> If you want to
        order some food, please choose food on the screen and check your cart.
        If you confirm with it, type <strong>ok</strong> on the message box😉
      </span>
    ),
  },
  2: {
    text: (
      <span>
        I saw your order cart. Would you like to dine-in or takeaway? Type{' '}
        <strong>dine in</strong> or <strong>takeaway</strong>
      </span>
    ),
  },
  3: {
    text: <span>Please choose your reservation.</span>,
  },
  4: {
    text: (
      <span>
        Sorry, you do not have any reservation. Please make a reservation first
        or takeaway the order.
      </span>
    ),
  },
  5: {
    text: (
      <span>
        Ok. I need some information to complete the order. What is your name?
      </span>
    ),
  },
  6: {
    text: (
      <span>
        What is your phone number? This will be phone number we contact you
        about the order
      </span>
    ),
  },
  7: {
    text: (
      <span>
        What time can you arrive to restaurant to take order away? type the date
        to box following syntax: dd/mm/yyyy hh:mm (24-hour format). E.g:
        25/04/2023 14:30
      </span>
    ),
  },
  8: {
    text: (
      <span>
        Ok. I am confirming your order. Now, please look at widget below on the
        chat area. If the order information is right, type ok
      </span>
    ),
  },
};

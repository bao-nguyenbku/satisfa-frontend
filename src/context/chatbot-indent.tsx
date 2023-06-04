import React, { ReactNode } from 'react';
import { BotActions } from '@/types/chatbot-types';

type Data = {
  [key: string]: {
    texts: string[];
    responses: ReactNode[];
    action?: () => void;
  };
};

class Indent {
  data: Data;
  symbol: RegExp;
  actions: BotActions;
  constructor(actions: BotActions) {
    this.symbol = /,|\.|'|\s|:|;|\?|!/;
    this.data = {
      greeting: {
        texts: ['hello', 'xin chào', 'chào bạn', 'hi', 'moring', 'hey'],
        responses: [
          <span key={0}>Hello</span>,
          <span key={1}>Hello 1</span>,
          <span key={2}>Hello 2</span>,
          <span key={3}>Hello 3</span>,
          <span key={4}>Hello 4</span>,
        ],
      },
      introduction: {
        texts: ['who', 'are', 'you', 'satisgi', 'bot', 'what', 'is'],
        responses: [
          <span key={0}>
            I am Satisgi, an automatic bot that support customer🥰. Type{' '}
            <strong>help</strong> to get support
          </span>,
        ],
      },
      location: {
        texts: ['address', 'restaurant', 'location', 'where'],
        responses: [
          <ul key={0}>
            <li>
              👉Satisfa restaurant is place at{' '}
              <strong>
                122 - 126, Satisfa Tower, Pasteur street, District 1, Ho Chi
                Minh City
              </strong>
            </li>
          </ul>,
        ],
      },
      help: {
        texts: ['help', 'helps'],
        responses: [],
        action: () => {
          actions.completeService();
          actions.resetService();
          actions.askForHelp();
        },
      },
      myOrders: {
        texts: ['orders', 'order', 'order', 'my', 'check'],
        responses: [],
      },
      myReservations: {
        texts: ['reservation', 'reservations', 'my', 'check', 'show'],
        responses: [],
      },
      suggest: {
        texts: ['suggest', 'show', 'see', 'me', 'menu'],
        responses: [],
        action: actions.suggestMenu,
      },
      reservation: {
        texts: ['reservation', 'book', 'table'],
        responses: [],
        action: actions.handleReservation,
      },
      operationTime: {
        texts: ['time', 'what', 'operation', 'working', 'open', 'close'],
        responses: [],
        action: actions.answerOperatingHours,
      },
      event: {
        texts: ['how', 'special', 'event', 'party', 'host', 'birthday'],
        responses: [
          <div className="flex flex-col gap-2" key={0}>
            <span>
              ✅Absolutely! We would be delighted to help you host your event at
              our restaurant. We offer event hosting services for various
              occasions, including private parties, corporate gatherings, and
              special celebrations.
            </span>
            <span>
              ✅Our dedicated events team will work closely with you to ensure a
              memorable experience for you and your guests.
            </span>
            <span>
              👉To get started, I recommend contacting our events team directly
              at
              <strong>0123 456 789</strong> or{' '}
              <strong>customer@satisfa.com</strong>
            </span>
            <span>
              👉They will be able to provide you with all the necessary details,
              including available dates, event packages, and any additional
              services or amenities we offer.
            </span>
          </div>,
        ],
      },
    };
    this.actions = actions;
  }
  simplify(message: string) {
    return message.toLowerCase().trim();
  }
  private sendResponse(indentKey: string) {
    const idx = Math.floor(
      Math.random() * this.data[indentKey].responses?.length,
    );
    if (
      this.data[indentKey].action &&
      typeof this.data[indentKey].action === 'function'
    ) {
      this.data[indentKey].action?.();
    }
    this.actions.sendMessage(this.data[indentKey].responses[idx]);
  }
  parse(userInput: string) {
    const rawInput = this.simplify(userInput);
    const messages = rawInput.split(this.symbol).filter((word) => word !== '');
    const scores = this.calculateScore(messages);
    let isSupport = false;
    const highestIndentKey = Object.keys(scores).reduce((prev, curr) =>
      scores[prev] >= scores[curr] ? prev : curr,
    );

    if (highestIndentKey && scores[highestIndentKey] !== 0) {
      this.sendResponse(highestIndentKey);
      isSupport = true;
    }
    return isSupport;
  }
  private calculateScore(messages: string[]) {
    type Score = {
      [key: string]: number;
    };
    const scores: Score = {};
    const indentKeys = Object.keys(this.data);
    indentKeys.forEach((key) => {
      scores[key] = 0;
    });
    indentKeys.forEach((key) => {
      messages.forEach((message) => {
        if (this.data[key].texts.includes(message)) {
          scores[key] += 1;
        }
      });
    });
    return scores;
  }
}

export { Indent };

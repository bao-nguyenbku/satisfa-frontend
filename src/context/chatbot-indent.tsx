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
    this.actions = actions;
    this.data = {
      greeting: {
        texts: [
          'hello',
          'hi',
          'hey',
          'good',
          'morning',
          'bot',
          'afternoon',
          'there',
          'salutations',
        ],
        responses: [
          <span key={0}>
            Hello, how are you doing today? How may I assist you?
          </span>,
          <span key={1}>
            Hi! Welcome to our chat service. How can I assist you today?
          </span>,
          <span key={2}>Good to see you! How may I help you today?</span>,
          <span key={3}>Hello! How can I assist you today?</span>,
          <span key={4}>Welcome! How may I help you?</span>,
          <span key={5}>Nice to see you? How may I help you today?</span>,
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
        texts: [
          'address',
          'restaurant',
          'location',
          'where',
          'how',
          'go',
          'your',
        ],
        responses: [
          <span key={0}>
            👉Satisfa restaurant is place at{' '}
            <a
              href="https://goo.gl/maps/ikEaSvhSAMwK5Zxr6"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-600 hover:underline">
              <strong>
                122 - 126, Satisfa Tower, Pasteur street, District 1, Ho Chi
                Minh City
              </strong>
            </a>
          </span>,
          <span key={1}>
            Our restaurant is located at{' '}
            <a
              href="https://goo.gl/maps/ikEaSvhSAMwK5Zxr6"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-600 hover:underline">
              <strong>
                122 - 126, Satisfa Tower, Pasteur street, District 1, Ho Chi
                Minh City
              </strong>
            </a>
            . We are conveniently situated near Bitexco Tower.
          </span>,
          <span key={2}>
            You can find us at{' '}
            <a
              href="https://goo.gl/maps/ikEaSvhSAMwK5Zxr6"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-600 hover:underline">
              <strong>
                122 - 126, Satisfa Tower, Pasteur street, District 1, Ho Chi
                Minh City
              </strong>
            </a>
            . We are easily accessible from Bitexco Tower.
          </span>,
        ],
      },
      help: {
        texts: ['help', 'helps'],
        responses: [
          <span key={0}>
            Hi. I am <strong>Satisgi</strong>, automatic bot. How can I help
            you?
          </span>,
        ],
        action: () => {
          actions.completeService();
          actions.resetService();
          actions.askForHelp({
            delay: 800,
          });
        },
      },
      order: {
        texts: ['i', 'want', 'to', 'order'],
        responses: [
          <span key={0}>
            Of course! I showed you the menu on the screen. <br /> If you want
            to order some food, please choose food on the screen and check your
            cart. If you confirm with it, type <strong>ok</strong> on the
            message box😉
          </span>,
        ],
        action: actions.handleOrder,
      },
      askQuestion: {
        texts: ['I', 'want', 'to', 'ask', 'some', 'questions'],
        responses: [<span key={0}>What do you want to ask?</span>],
        action: () =>
          actions.showQuestions({
            delay: 800,
          }),
      },
      myOrders: {
        texts: [
          'orders',
          'order',
          'order',
          'my',
          'check',
          'want',
          'to',
          'i',
          'show',
          'let',
          'me',
          'go',
        ],
        responses: [
          <span key={0}>
            We navigate you to your history orders. Let check out the screen😘
          </span>,
        ],
        action: actions.checkMyOrders,
      },
      myReservations: {
        texts: ['reservation', 'reservations', 'my', 'check', 'show'],
        responses: [
          <span key={0}>
            We show you all your reservations on the screen. Let check it out🥰
          </span>,
        ],
        action: actions.checkMyReservations,
      },
      suggest: {
        texts: ['suggest', 'show', 'see', 'me', 'menu'],
        responses: [],
        action: actions.suggestMenu,
      },
      parking: {
        texts: ['do', 'you', 'have', 'parking', 'slot', 'area', 'available'],
        responses: [
          <div className="flex flex-col gap-2" key={0}>
            <span>✅Yes, we do have parking available for our customers.</span>
            <span> ✅We provide parking lot and street parking.</span>
            <span>
              ✅Our parking facilities are conveniently located near the
              restaurant to ensure easy access for our guests and of course,
              it&apos;s free.
            </span>
          </div>,
        ],
      },
      reservation: {
        texts: [
          'reservation',
          'book',
          'table',
          'i',
          'want',
          'to',
          'make',
          'create',
          'booking',
        ],
        responses: [
          <span key={0}>
            First, let you pick a date for your meal. Please type with syntax:
            DD/MM/YYYY
          </span>,
        ],
        action: actions.handleReservation,
      },
      operationTime: {
        texts: [
          'time',
          'what',
          'operation',
          'working',
          'open',
          'close',
          'is',
          'your',
          'of',
          'restaurant',
        ],
        responses: [
          <div className="flex flex-col gap-2" key={0}>
            <span>
              ✅Our restaurant is open all day from <strong>8:00 am</strong> to{' '}
              <strong>10:00 pm</strong> (Except for some special activities).
            </span>
            <span>
              ✅We are pleased to serve you during this time and look forward to
              welcoming you to our establishment
            </span>
          </div>,
        ],
        action: actions.answerOperatingHours,
      },
      event: {
        texts: [
          'how',
          'special',
          'event',
          'party',
          'host',
          'birthday',
          'can',
          'parties',
          'private',
        ],
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
      // recommendation: {
      //   texts: [
      //     'recommend',
      //     'recommendation',
      //     'food',
      //     'today',
      //     'best',
      //     'seller',
      //     'favorite'
      //   ],
      //   responses:
      // },
    };
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

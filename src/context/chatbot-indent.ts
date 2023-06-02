import { BotActions } from '@/types/chatbot-types';

type Data = {
  [key: string]: {
    texts: string[];
    action: () => void;
  };
};

class Indent {
  data: Data;
  symbol: RegExp;
  actions: BotActions;
  constructor(actions: BotActions) {
    this.symbol = /,|\.|'|\s|:|;/;
    this.data = {
      introduction: {
        texts: ['hello', 'xin chào', 'chào bạn', 'hi', 'moring', 'hey'],
        action: actions.introduce,
      },
      location: {
        texts: ['address', 'restaurant', 'location', 'where'],
        action: actions.showLocation,
      },
      help: {
        texts: ['help', 'helps'],
        action: () => {
          actions.completeService();
          actions.resetService();
          actions.askForHelp();
        },
      },
      myOrders: {
        texts: ['orders', 'order', 'order', 'my', 'check'],
        action: () => {
          alert('Showed order');
        },
      },
      suggest: {
        texts: ['suggest', 'show', 'see', 'me', 'menu'],
        action: actions.suggestMenu,
      },
      reservation: {
        texts: ['reservation', 'book', 'table'],
        action: actions.handleReservation,
      },
      operationTime: {
        texts: ['time', 'what', 'operation', 'working', 'open', 'close'],
        action: actions.answerOperatingHours,
      },
    };
    this.actions = actions;
  }
  simplify(message: string) {
    return message.toLowerCase().trim();
  }
  parse(userInput: string) {
    const rawInput = this.simplify(userInput);
    const messages = rawInput.split(this.symbol).filter((word) => word !== '');
    const scores = this.calculateScore(messages);
    let isSupport = false;
    const highestIndent = Object.keys(scores).reduce((prev, curr) =>
      scores[prev] >= scores[curr] ? prev : curr,
    );

    if (highestIndent && scores[highestIndent] !== 0) {
      this.data[highestIndent].action();
      isSupport = true;
    }
    return isSupport;
  }
  calculateScore(messages: string[]) {
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

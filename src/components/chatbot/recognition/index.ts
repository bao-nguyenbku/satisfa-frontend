import { BotActions } from '../types';

type IndentData = {
  [key: string]: {
    texts: string[];
    action: () => void;
  };
};

class Indent {
  data: IndentData;
  symbol: string[];
  actions: BotActions;
  constructor(actions: BotActions) {
    this.symbol = ['?', '!', '/', '\\'];
    this.data = {
      introduction: {
        texts: ['hello', 'xin chào', 'chào bạn', 'hi'],
        action: actions.introduce,
      },
      location: {
        texts: ['address', 'restaurant address', 'location'],
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
        texts: ['my orders', 'my order', 'check order'],
        action: () => {
          return;
        },
      },
      suggest: {
        texts: [
          'suggest',
          'show me menu',
          'watch menu',
          'today menu',
          'show menu',
          'see menu',
          'menu'
        ],
        action: actions.suggestMenu,
      },
    };
    this.actions = actions;
  }
  simlify(message: string) {
    return message.toLowerCase().trim();
  }
  parse(message: string) {
    const rawMessage = this.simlify(message);
    const parseToWordMessages = rawMessage.split(' ');
    let isSupport = false;
    Object.keys(this.data).forEach((key) => {
      const isValid = this.data[key].texts.some((sentence) => {
        return (
          rawMessage === sentence ||
          parseToWordMessages.some((word) => word === sentence)
        );
      });

      if (isValid) {
        this.data[key].action();
        isSupport = true;
      }
    });
    return isSupport;
  }
}

export { Indent };

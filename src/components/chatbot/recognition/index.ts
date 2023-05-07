import { BotActions } from '../types';

type IndentData = {
  [key: string]: {
    texts: string[];
    action: () => void;
  };
};

class Indent {
  data: IndentData;
  actions: BotActions;
  constructor(actions: BotActions) {
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
        ],
        action: actions.suggestMenu,
      },
    };
    this.actions = actions;
  }
  simlify(message: string) {
    return message.toLowerCase().trim();
  }
  // isValid(message: string) {
  //   const rawMessage = this.simlify(message);
  //   Object.keys(this.data).forEach((key) => {
  //     return this.data[key].texts.some((sentence) => rawMessage.includes(sentence));
  //   });
  // }
  parse(message: string) {
    const rawMessage = this.simlify(message);
    let isSupport = false;
    Object.keys(this.data).forEach((key) => {
      const isValid = this.data[key].texts.some((sentence) =>
        rawMessage.includes(sentence),
      );
      if (isValid) {
        this.data[key].action();
        isSupport = true;
      }
    });
    return isSupport;
  }
}

export { Indent };

import React, {
  createContext,
  useState,
  useEffect,
  ReactElement,
  // cloneElement,
} from 'react';
import {
  MessageOption,
  Message,
  BotService,
  DEFAULT_DELAY,
} from '@/components/chatbot/types';
import Options from '@/components/chatbot/options';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks';
import { selectBotReservationState, selectBotOrderState } from '@/store/reducer/chatbot';
// import Yes from '@/components/chatbot/widgets/yes';

type Props = {
  children: React.ReactNode;
};

interface IChatbotContext {
  messages: Message[];
  createBotMessage: (message: string, options: MessageOption) => void;
  createUserMessage: (message: string, options: MessageOption) => void;
  createOptions: (options: MessageOption) => void;
  isTyping: boolean;
  activeTyping: () => void;
  disableTyping: () => void;
  actions: any;
  botService: BotService;
}
export const ChatbotContext = createContext<IChatbotContext>({
  messages: [{} as Message],
  createBotMessage: () => {
    return;
  },
  createUserMessage: () => {
    return;
  },
  createOptions: () => {
    return;
  },
  activeTyping: () => {
    return;
  },
  disableTyping: () => {
    return;
  },
  isTyping: false,
  actions: {},
  botService: BotService.NONE,
});

export const ChatbotProvider = ({ children }: Props) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [botService, setBotService] = useState<BotService>(BotService.NONE);
  const router = useRouter();
  const botReservation = useAppSelector(selectBotReservationState);
  const botOrder = useAppSelector(selectBotOrderState);

  const createOptions = (options?: MessageOption) => {
    const { delay = DEFAULT_DELAY } = options ? options : {};
    setTimeout(() => {
      setMessages((prev) => {
        return [
          ...prev,
          {
            id: Math.random(),
            text: '',
            role: 'widget',
            isNew: false,
            component: <Options actions={actions} />,
          },
        ];
      });
    }, delay);
  };
  const createBotMessage = (message: string | ReactElement, options?: MessageOption) => {
    const { delay = DEFAULT_DELAY } = options ? options : {};
    activeTyping();
    setTimeout(() => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage) {
          return [
            ...prev.slice(0, prev.length - 1),
            {
              ...lastMessage,
              isNew: false,
            },
            {
              id: Math.random(),
              text: message,
              role: 'bot',
              isNew: true,
            },
          ];
        }
        return [
          ...prev,
          {
            id: Math.random(),
            text: message,
            role: 'bot',
            isNew: true,
          },
        ];
      });
      disableTyping();
    }, delay);
  };
  // const createWidget = (widget: ReactElement) => {
  //   setTimeout(() => {
  //     setMessages((prev) => {
  //       return [
  //         ...prev,
  //         {
  //           id: Math.random(),
  //           text: '',
  //           role: 'widget',
  //           isNew: false,
  //           component: cloneElement(widget as ReactElement, {
  //             actions,
  //           }),
  //         },
  //       ];
  //     });
  //   }, DEFAULT_DELAY);
  // };
  const createUserMessage = (message: string) => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage) {
        return [
          ...prev.slice(0, prev.length - 1),
          {
            ...lastMessage,
            isNew: false,
          },
          {
            id: Math.random(),
            text: message,
            role: 'user',
            isNew: true,
          },
        ];
      }
      return [
        ...prev,
        {
          id: Math.random(),
          text: message,
          role: 'user',
          isNew: true,
        },
      ];
    });
  };
  const activeTyping = () => {
    setIsTyping(true);
  };
  const disableTyping = () => {
    setIsTyping(false);
  };
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'bot' && lastMessage?.isNew) {
      disableTyping();
    }
  }, [messages]);
  const actions = {
    unhandleInput: () => {
      createBotMessage(<p>I can not understand. Please provide correct syntax. If you need help, let you type <strong className='font-bold'>help</strong></p>);
    },
    askForHelp: () => {
      createBotMessage('Hi, I am Satisgi. How can I help you?');
      createOptions();
    },
    introduce: () => {
      createBotMessage('Hi, I am Satisgi. Nice to meet you 😍. If you need some help, type help in the textbox👇');
    },
    navigateToReservation: () => {
      router.replace('/reservation');
    },
    navigateToMenu: () => {
      router.replace('/menu');
    },
    handleReservation: () => {
      setBotService(BotService.RESERVATION);
      actions.navigateToReservation();
      createBotMessage(
        'Of course! I navigated you to reservation page, do you see it😉',
      );
      actions.getDatePicker({
        delay: 600,
      });
    },
    getDatePicker: (options?: MessageOption) => {
      createBotMessage(botReservation[0].text, {
        delay: options ? options.delay : DEFAULT_DELAY,
      });
    },
    sendMessage: (message: string, options?: MessageOption) => {
      createBotMessage(message, {
        delay: options ? options.delay : DEFAULT_DELAY,
      });
    },
    getTimePicker: (options?: MessageOption) => {
      createBotMessage(botReservation[1].text, {
        delay: options ? options.delay : DEFAULT_DELAY,
      });
    },
    getGuest: (options?: MessageOption) => {
      createBotMessage(botReservation[2].text, {
        delay: options ? options.delay : DEFAULT_DELAY,
      });
    },
    confirmYes: () => {
      return;
    },
    chooseFoodFromMenu: () => {
      createBotMessage(botOrder[0].text);
    },
    handleOrder: () => {
      setBotService(BotService.ORDER);
      actions.navigateToMenu();
      actions.chooseFoodFromMenu();
    },
  };
  return (
    <ChatbotContext.Provider
      value={{
        messages,
        createBotMessage,
        createUserMessage,
        createOptions,
        isTyping,
        activeTyping,
        disableTyping,
        actions,
        botService,
      }}>
      {children}
    </ChatbotContext.Provider>
  );
};

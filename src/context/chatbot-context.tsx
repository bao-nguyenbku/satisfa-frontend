import React, {
  createContext,
  useState,
  useEffect,
  ReactElement,
  cloneElement,
} from 'react';
import * as _ from 'lodash';
import {
  MessageOption,
  Message,
  BotService,
  DEFAULT_DELAY,
} from '@/components/chatbot/types';
import Options from '@/components/chatbot/options';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks';
import {
  selectBotReservationState,
  selectBotOrderState,
} from '@/store/reducer/chatbot';
// import Yes from '@/components/chatbot/widgets/yes';
import WidgetWrapper from '@/components/chatbot/widget-wrapper';

type Props = {
  children: React.ReactNode;
};

interface IChatbotContext {
  messages: Message[];
  createBotMessage: (message: string, options?: MessageOption) => void;
  createUserMessage: (message: string, options?: MessageOption) => void;
  createWidget: (widget: ReactElement, options?: MessageOption) => void;
  isTyping: boolean;
  activeTyping: () => void;
  disableTyping: () => void;
  actions: {
    [key: string]: (params?: any, options?: MessageOption) => void;
  };
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
  createWidget: () => {
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
  const botOrderState = useAppSelector(selectBotOrderState);

  const createBotMessage = (
    message: string | ReactElement,
    options?: MessageOption,
  ) => {
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
  const createWidget = (widget: ReactElement, options?: MessageOption) => {
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
            component: (
              <WidgetWrapper>
                {cloneElement(widget as ReactElement, {
                  actions,
                })}
              </WidgetWrapper>
            ),
          },
        ];
      });
    }, delay);
  };
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
      createBotMessage(
        <p>
          I can not understand. Please provide correct syntax. If you need help,
          let you type <strong className="font-bold">help</strong>
        </p>,
      );
    },
    askForHelp: () => {
      createBotMessage('Hi, I am Satisgi. How can I help you?');
      createWidget(<Options actions={actions} />);
    },
    introduce: () => {
      createBotMessage(
        'Hi, I am Satisgi. Nice to meet you 😍. If you need some help, type help in the textbox👇',
      );
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
      createBotMessage(botReservation.steps[1].text, {
        delay: options ? options.delay : DEFAULT_DELAY,
      });
    },
    sendMessage: (message: string, options?: MessageOption) => {
      const widget =
        options &&
        _.has(options, 'widget') &&
        !_.isEmpty(options.widget) &&
        options.widget;

      const delay =
        options && _.has(options, 'delay') && !_.isEmpty(options.delay)
          ? options.delay
          : DEFAULT_DELAY;
      createBotMessage(message, {
        delay,
      });
      if (widget) {
        createWidget(widget, {
          delay,
        });
      }
    },
    sendWidget: (widget: ReactElement, options?: MessageOption) => {
      createWidget(widget, options);
    },
    getTimePicker: (options?: MessageOption) => {
      createBotMessage(botReservation.steps[2].text, {
        delay: options ? options.delay : DEFAULT_DELAY,
      });
    },
    getGuest: (options?: MessageOption) => {
      createBotMessage(botReservation.steps[3].text, {
        delay: options ? options.delay : DEFAULT_DELAY,
      });
    },
    showTables: (options?: MessageOption) => {
      createBotMessage(botReservation.steps[4].text, {
        delay: options ? options.delay : DEFAULT_DELAY,
      });
    },
    confirmYes: () => {
      return;
    },
    chooseFoodFromMenu: () => {
      createBotMessage(botOrderState.steps[1].text);
    },
    handleOrder: () => {
      setBotService(BotService.ORDER);
      actions.navigateToMenu();
      actions.chooseFoodFromMenu();
    },
    completeService: () => {
      setBotService(BotService.NONE);
    },
  };
  return (
    <ChatbotContext.Provider
      value={{
        messages,
        createBotMessage,
        createUserMessage,
        createWidget,
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

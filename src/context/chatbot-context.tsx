import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  ReactElement,
  cloneElement,
} from 'react';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import {
  MessageOption,
  BotActions,
  Message,
  BotService,
  DEFAULT_DELAY,
  WidgetType,
} from '@/types/chatbot-types';
import Options from '@/components/chatbot/options';
// import { useRouter } from 'next/router';
import { useAppDispatch } from '@/hooks';
// import ShowBestSeller from '@/components/chatbot/widgets/show-best-seller';
import RecommendationSlide from '@/components/chatbot/widgets/recommendation-slide';
import {
  resetCreateOrder,
  resetCreateReservation,
  // selectBotReservationState,
  setReservationDinein,
} from '@/store/reducer/chatbot';
import {
  botOrderMessage,
  botReserveMessage,
  botRecommendationMessage,
} from '@/components/chatbot/steps';
import WidgetWrapper from '@/components/chatbot/components/widget-wrapper';
import { Reservation } from '@/types';
import ShowConfirmationOrder from '@/components/chatbot/widgets/show-confirmation-order';
import { formatDate } from '@/utils';
import ShowTables from '@/components/chatbot/widgets/show-tables';
import FrequentlyQuestion from '@/components/chatbot/widgets/frequently-question';
import { Indent } from './chatbot-indent';

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
  actions: BotActions;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  indent: Indent;
  botService: BotService;
}
export const ChatbotContext = createContext<IChatbotContext>({
  messages: [{} as Message],
  open: () => {
    return;
  },
  close: () => {
    return;
  },
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
  indent: {} as Indent,
  isTyping: false,
  isOpen: false,
  actions: {},
  botService: BotService.NONE,
});

export const ChatbotProvider = ({ children }: Props) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [botService, setBotService] = useState<BotService>(BotService.NONE);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const createBotMessage = (message: ReactNode, options?: MessageOption) => {
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
    const { widgetType = WidgetType.WIDGET } = options ? options : {};
    setTimeout(() => {
      setMessages((prev) => {
        return [
          ...prev,
          {
            id: Math.random(),
            text: '',
            role: 'widget',
            isNew: true,
            component: (
              <WidgetWrapper option={widgetType}>
                {cloneElement(widget as ReactElement, {
                  actions,
                  createUserMessage,
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
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'bot' && lastMessage?.isNew) {
      disableTyping();
    }
  }, [messages]);
  const actions = {
    // ! GENERAL
    unhandleInput: () => {
      createBotMessage(
        <p>
          I can not understand. Please provide correct syntax. If you need help,
          let you type <strong>help</strong>
        </p>,
      );
    },
    callWaiter: () => {
      createBotMessage('I called waiter for you. Please wait for a moment😉');
    },
    showQuestions: (options?: MessageOption) => {
      createWidget(<FrequentlyQuestion />, {
        ...options,
        widgetType: WidgetType.SELECTION,
      });
    },
    sendMessage: (message: ReactNode, options?: MessageOption) => {
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
        ...options,
      });
      if (widget) {
        createWidget(widget, {
          delay,
          ...options,
        });
      }
    },
    sendWidget: (widget: ReactElement, options?: MessageOption) => {
      createWidget(widget, options);
    },
    askForHelp: (options?: MessageOption) => {
      createWidget(<Options actions={actions} />, {
        ...options,
        widgetType: WidgetType.SELECTION,
      });
    },
    suggestMenu: () => {
      createBotMessage(
        <span>
          We think you may like these <br />
          Do any of them make you fancy?
        </span>,
      );
      router.push('/menu');
    },
    // ! MAKE RESERVATION
    navigateToReservation: () => {
      router.replace('/reservation');
    },
    handleReservation: () => {
      setBotService(BotService.RESERVATION);
      actions.navigateToReservation();
      // createBotMessage('I navigated you to reservation page, do you see it😉');
      // createBotMessage(botReserveMessage[1].text, {
      //   delay: 500,
      // });
    },
    getDatePicker: (options?: MessageOption) => {
      createBotMessage(botReserveMessage[1].text, options);
    },
    getTimePicker: (options?: MessageOption) => {
      createBotMessage(botReserveMessage[2].text, options);
    },
    checkMyReservations: () => {
      router.push('/me/reservations');
    },
    checkMyOrders: () => {
      router.push('/me/orders');
    },
    getGuestPicker: (options?: MessageOption) => {
      createBotMessage(botReserveMessage[3].text, options);
    },
    showTables: (options?: MessageOption) => {
      createBotMessage(botReserveMessage[4].text, options);
      createWidget(<ShowTables />, {
        delay: 500,
      });
    },
    completeBookingTable: (
      reservation?: Reservation,
      options?: MessageOption,
    ) => {
      open();
      const message = (
        <span>
          Successfullly! Remember to come to restaurant on{' '}
          <strong>{formatDate(reservation?.date as string)}</strong>. Glad to be
          of service.
        </span>
      );

      createBotMessage(message, options);
      actions.completeService();
    },
    onSelectReservation: (item: Reservation) => {
      dispatch(setReservationDinein(item));
      actions.sendMessage(botOrderMessage[8].text, {
        widget: <ShowConfirmationOrder />,
      });
    },
    // ! ORDER FOOD
    navigateToMenu: () => {
      router.replace('/menu');
    },
    chooseDineInOrTakeaway: (options?: MessageOption) => {
      createBotMessage(botOrderMessage[2].text, options);
    },
    getPhoneTakeaway: (options?: MessageOption) => {
      createBotMessage(botOrderMessage[6].text, options);
    },
    handleOrder: () => {
      setBotService(BotService.ORDER);
      actions.navigateToMenu();
    },
    showBestSeller: () => {
      createBotMessage(botRecommendationMessage[1].text);
      createWidget(<RecommendationSlide />, {
        widgetType: WidgetType.SELECTION,
      });
      createBotMessage(botRecommendationMessage[2].text, {
        delay: 500,
      });
    },
    completeRecommendation: () => {
      createBotMessage(botRecommendationMessage[3].text, {
        delay: 500,
      });
    },
    handleRecommendation: () => {
      setBotService(BotService.RECOMMENDATION);
      actions.navigateToMenu();
      actions.showBestSeller();
    },
    completeService: () => {
      setBotService(BotService.NONE);
      actions.resetService();
    },

    resetService: () => {
      dispatch(resetCreateOrder());
      dispatch(resetCreateReservation());
    },
  };
  const indent = new Indent(actions);
  return (
    <ChatbotContext.Provider
      value={{
        indent,
        messages,
        createBotMessage,
        createUserMessage,
        createWidget,
        isTyping,
        activeTyping,
        disableTyping,
        actions,
        botService,
        open,
        isOpen,
        close,
      }}>
      {children}
    </ChatbotContext.Provider>
  );
};

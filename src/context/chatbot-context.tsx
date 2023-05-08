import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  ReactElement,
  cloneElement,
} from 'react';
import * as _ from 'lodash';
import {
  MessageOption,
  BotActions,
  Message,
  BotService,
  DEFAULT_DELAY,
  WidgetType,
} from '@/components/chatbot/types';
import Options from '@/components/chatbot/options';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  resetCreateOrder,
  resetCreateReservation,
  // selectBotReservationState,
  setReservationDinein,
} from '@/store/reducer/chatbot';
import { botOrderMessage, botReserveMessage } from '@/components/chatbot/steps';
import WidgetWrapper from '@/components/chatbot/widget-wrapper';
import { Reservation } from '@/types/data-types';
import ShowConfirmationOrder from '@/components/chatbot/widgets/show-confirmation-order';
import { selectReservationState } from '@/store/reducer/reservation';
import { formatDate } from '@/utils';
import ShowTables from '@/components/chatbot/widgets/show-tables';

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
  const reservationInfo = useAppSelector(selectReservationState);

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
      createWidget(<Options actions={actions} />, {
        widgetType: WidgetType.SELECTION,
      });
    },
    showLocation: () => {
      createBotMessage(
        <ul>
          <li>
            👉Satisfa restaurant is place at{' '}
            <strong>
              122 - 126, Satisfa Tower, Pasteur street, District 1, Ho Chi Minh
              City
            </strong>
          </li>
          <li>
            👉We serve from <strong>8:00am</strong> to <strong>10:00pm</strong>{' '}
            everyday
          </li>
        </ul>,
      );
    },
    // checkOrder: () => {

    // },
    suggestMenu: () => {
      createBotMessage(
        <span>
          We think you may like these <br />
          Do any of them make you fancy?
        </span>,
      );
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
      createBotMessage('I navigated you to reservation page, do you see it😉');
      createBotMessage(botReserveMessage[1].text, {
        delay: 500,
      });
    },
    getDatePicker: (options?: MessageOption) => {
      createBotMessage(botReserveMessage[1].text, options);
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
      createBotMessage(botReserveMessage[2].text, options);
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
    completeBookingTable: (options?: MessageOption) => {
      open();
      const message = `Congratulations! You now can come to my restaurant at ${formatDate(
        reservationInfo.createReservationData.data.date,
      )} 
      on table ${reservationInfo.createReservationData.code}`;
      createBotMessage(message, options);
      actions.completeService();
    },
    confirmYes: () => {
      return;
    },
    chooseFoodFromMenu: () => {
      createBotMessage(botOrderMessage[1].text);
    },
    handleOrder: () => {
      setBotService(BotService.ORDER);
      actions.navigateToMenu();
      actions.chooseFoodFromMenu();
    },
    completeService: () => {
      setBotService(BotService.NONE);
    },
    onSelectReservation: (item: Reservation) => {
      dispatch(setReservationDinein(item));
      actions.sendMessage(botOrderMessage[8].text, {
        widget: <ShowConfirmationOrder />,
      });
    },
    resetService: () => {
      dispatch(resetCreateOrder());
      dispatch(resetCreateReservation());
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
        open,
        isOpen,
        close,
      }}>
      {children}
    </ChatbotContext.Provider>
  );
};

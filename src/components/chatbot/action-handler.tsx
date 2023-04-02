import React from 'react';
import { useRouter } from 'next/router';

type Props = any;

const ActionHandler = (props: Props) => {
  const { createBotMessage, children } = props;
  const router = useRouter();
  const unhandleInput = () => {
    createBotMessage('I do not understand!');
  };

  const navigateToReservation = () => {
    router.replace('/reservation');
  };
  const navigateToMenu = () => {
    router.replace('/menu');
  };
  return React.cloneElement(children, {
    ...props,
    actions: {
      unhandleInput,
      navigateToReservation,
      navigateToMenu,
    },
  });
};

export default ActionHandler;

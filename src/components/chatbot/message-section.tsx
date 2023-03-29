import React, { ReactElement, cloneElement, useRef, useEffect } from 'react';
import MeMessageItem from './me-message-item';
import GuestMessageItem from './guest-message-item';
import TypingIndicator from './typing-indicator';
import { Message } from './types';
import { motion } from 'framer-motion';

type Props = {
  messages?: Message[];
  isTyping?: boolean;
};

const MessageSection = (props: Props) => {
  const { messages, isTyping } = props;
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, sectionRef]);
  return (
    <div
      className="w-full overflow-y-scroll flex flex-col gap-6 px-2 mt-auto"
      ref={sectionRef}>
      {messages &&
        messages.map((payload) => {
          if (payload.role === 'user') {
            return (
              <motion.div
                className="ml-auto"
                key={payload.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  originX: 0,
                }}>
                <MeMessageItem message={payload.text} />;
              </motion.div>
            );
          }
          if (payload.role === 'bot') {
            return (
              <motion.div
                className="mr-auto"
                key={payload.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  originX: 0,
                }}>
                <GuestMessageItem message={payload.text} />
              </motion.div>
            );
          }
          if (payload.role === 'widget') {
            return (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  originX: 0,
                }}
                key={payload.id}>
                {cloneElement(payload?.component as ReactElement, {
                  ...props,
                })}
              </motion.div>
            );
          }
        })}
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default MessageSection;

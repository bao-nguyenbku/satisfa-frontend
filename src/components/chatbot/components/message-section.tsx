import React, { ReactElement, cloneElement, useRef, useEffect } from 'react';
import MeMessageItem from './me-message-item';
import GuestMessageItem from './guest-message-item';
import TypingIndicator from '@/components/common/typing-indicator';
import { Message } from '../types';
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
  }, [messages, sectionRef, isTyping]);
  return (
    <div
      className="w-full overflow-y-scroll overflow-x-hidden flex flex-col gap-6 px-2 mt-auto"
      ref={sectionRef}>
      {messages &&
        messages.map((payload) => {
          if (payload.role === 'user') {
            return (
              <div
                className="ml-auto"
                key={payload.id}
                >
                <MeMessageItem message={payload.text} />
              </div>
            );
          }
          if (payload.role === 'bot') {
            return (
              <motion.div
                className="mr-auto"
                key={payload.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                style={{
                  originX: 0,
                  originY: 1,
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
                transition={{
                  duration: 0.4,
                  delay: 0,
                  ease: [0, 0.71, 0.2, 1.01],
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

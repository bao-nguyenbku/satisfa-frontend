import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
};

export default function TransitionRoute(props: Props) {
  const { children } = props;
  const { asPath } = useRouter();
  const variants = {
    out: {
      opacity: 1,
      y: 40,
      transition: {
        duration: 0.75,
      },
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: 0.2,
      },
    },
  };
  return (
    <AnimatePresence initial mode="wait">
      <motion.div
        key={asPath}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
        // exit={{
        //   backgroundColor: '#000'
        // }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

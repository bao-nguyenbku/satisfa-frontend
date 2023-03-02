import React from 'react';
import styles from './styles.module.scss';

type Props = {};

const TypingIndicator = (props: Props) => {
  return (
    <div className={styles.typingIndicator}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default TypingIndicator;

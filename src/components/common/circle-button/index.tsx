import React from 'react';
import { Button as Btn, ButtonProps } from '@mui/material';
import styles from './styles.module.scss';

type Props = ButtonProps;

const CircleButton = (props: Props) => {
  const { children } = props;
  return (
    <div className={styles.circleBtn}>
      <Btn>{children}</Btn>
    </div>
  );
};

export default CircleButton;

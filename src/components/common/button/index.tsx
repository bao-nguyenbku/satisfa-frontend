import React from 'react';
import { Button as Btn, ButtonProps } from '@mui/material';

type Props = ButtonProps;

const Button = (props: Props) => {
  const { children } = props;
  return <Btn {...props}>{children}</Btn>;
};

export default Button;

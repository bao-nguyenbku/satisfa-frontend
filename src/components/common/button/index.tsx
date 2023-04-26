import React from 'react';
import { Button as Btn, ButtonProps } from '@mui/material';
import { podkova } from '@/constants';
type Props = ButtonProps;

const Button = (props: Props) => {
  const { children } = props;
  return (
    <Btn
      {...props}
      style={{
        fontFamily: podkova.style.fontFamily,
        fontWeight: podkova.style.fontWeight,
        fontSize: podkova.style.fontStyle,
        textTransform: 'none',
        paddingLeft: 8,
        paddingRight: 8
      }}>
      {children}
    </Btn>
  );
};

export default Button;

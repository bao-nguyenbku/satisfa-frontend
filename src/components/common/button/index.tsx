import React from 'react';
import { Button as Btn, ButtonProps } from '@mui/material';
import { primaryFont } from '@/constants';
type Props = ButtonProps;

const Button = (props: Props) => {
  const { children } = props;
  return (
    <Btn
      {...props}
      style={{
        fontFamily: primaryFont.style.fontFamily,
        fontWeight: primaryFont.style.fontWeight,
        fontSize: primaryFont.style.fontStyle,
        textTransform: 'none',
        paddingLeft: 8,
        paddingRight: 8
      }}>
      {children}
    </Btn>
  );
};

export default Button;

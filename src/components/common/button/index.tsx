import React from 'react';
import { Button as Btn, ButtonProps } from '@mui/material';
import { primaryFont } from '@/constants';
import Loading from '../loading';
type Props = ButtonProps & {
  isLoading?: boolean;
};

const Button = (props: Props) => {
  const { children, isLoading, className, ...rest } = props;
  return (
    <Btn
      {...rest}
      className={`disabled:opacity-50 ${className}`}
      disabled={isLoading}
      style={{
        fontFamily: primaryFont.style.fontFamily,
        fontWeight: primaryFont.style.fontWeight,
        fontSize: primaryFont.style.fontStyle,
        paddingLeft: 8,
        paddingRight: 8,
      }}>
      {isLoading ? <Loading /> : children}
    </Btn>
  );
};

export default Button;

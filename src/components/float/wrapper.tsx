import { ReactElement, ReactNode, cloneElement } from 'react';

type Props = {
  children: ReactNode;
};

export default function Wrapper(props: Props) {
  const { children } = props;

  return cloneElement(children as ReactElement, {
    className:
      'w-16 h-16 bg-slate-800 p-3 rounded-full z-10',
  });
}

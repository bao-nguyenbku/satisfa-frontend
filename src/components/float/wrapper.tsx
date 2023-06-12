import { ReactElement, ReactNode, cloneElement } from 'react';

type Props = {
  children: ReactNode;
};

export default function Wrapper(props: Props) {
  const { children } = props;

  return cloneElement(children as ReactElement, {
    className:
      'w-12 h-12 lg:w-16 lg:h-16 bg-slate-800 p-2 lg:p-3 rounded-full z-10',
  });
}

import { ReactElement, ReactNode, cloneElement } from 'react';

type Props = {
  children: ReactNode;
};

export default function Wrapper(props: Props) {
  const { children } = props;

  return cloneElement(children as ReactElement, {
    className:
      'w-16 h-16 border-gray-600 bg-white/5 p-3 border rounded-full z-10 animate-pulse',
  });
}

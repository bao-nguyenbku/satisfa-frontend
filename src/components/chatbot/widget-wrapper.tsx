import React from 'react';

import { WidgetType } from './types';

type Props = {
  children: React.ReactElement;
  option?: WidgetType;
};
export default function WidgetWrapper(props: Props) {
  const { children, option } = props;
  if (!option || option === WidgetType.WIDGET) {
    return (
      <div className="bg-neutral-900/40 text-white border border-gray-600 rounded-xl p-2">
        {children}
      </div>
    );
  }
  return <div className="flex justify-end">{children}</div>;
}

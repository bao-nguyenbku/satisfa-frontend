import React from 'react';

import { WidgetType } from '@/components/chatbot/types';

type Props = {
  children: React.ReactElement;
  option?: WidgetType;
};
export default function WidgetWrapper(props: Props) {
  const { children, option } = props;
  if (!option || option === WidgetType.WIDGET) {
    return (
      <div className="bg-slate-800 text-white rounded-xl p-2">
        {children}
      </div>
    );
  }
  return <div className="flex justify-end">{children}</div>;
}

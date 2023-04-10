import React from 'react'

type Props = {
  children: React.ReactElement
}
export default function WidgetWrapper(props: Props) {
  const { children } = props;
  return (
    <div className='bg-neutral-900/40 text-white border border-gray-500 rounded-xl p-2'>
      {children}
    </div>
  )
}
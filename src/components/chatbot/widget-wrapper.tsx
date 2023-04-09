import React from 'react'

type Props = {
  children: React.ReactElement
}
export default function WidgetWrapper(props: Props) {
  const { children } = props;
  return (
    <div className='bg-white/20 text-white border border-white rounded-xl p-2'>
      {children}
    </div>
  )
}
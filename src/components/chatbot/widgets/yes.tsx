import React from 'react'
import Button from '@/components/common/button'

const Yes = (props: any) => {
  const { actions } = props;
  return (
    <Button 
      className='bg-white rounded-full w-max normal-case text-black hover:bg-white/70'
      onClick={() => actions.confirmYes()}
    >Yes</Button>
  )
}

export default Yes
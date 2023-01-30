import React from 'react'

type Props = {}

const NavigationBar = (props: Props) => {
  return (
    <ul className='flex items-center fixed z-10 text-white gap-3 right-0'>
      <li>About us</li>
      <li>Our menu</li>
      <li>Contact</li>
      <li>Sign in</li>
    </ul>
  )
}

export default NavigationBar
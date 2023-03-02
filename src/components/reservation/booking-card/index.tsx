import { Button } from '@mui/material';
import React from 'react'

type Props = {}

const BookingCard = (props: Props) => {
  return (
    <div
      className='bg-primary-dark text-white rounded-none p-3 border border-gray-600'
    >
      <h1>Confirm reservation</h1>
      <Button
        className='bg-primary-yellow text-white normal-case hover:bg-primary-dark rounded-none'
      >Booking</Button>
    </div>
  )
}

export default BookingCard
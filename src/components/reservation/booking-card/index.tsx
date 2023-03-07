import { Button } from '@mui/material';
import React from 'react'

import { useAppSelector, useAppDispatch } from '@/hooks';
import { ReservationType } from '@/types/data-types';
import { useCreateReservationMutation } from '@/service/reseravation';

type Props = {}
let reserveData : ReservationType = {
  tableId: "63fb319e765710c5bae252f0",
  date: new Date().toString(),
  note: "tran chau duong den",
  numberOfGuest: 0,
  customerId: "63fb319e765710c5bae252f0"
}
const BookingCard = (props: Props) => {

  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => (state.reservation))
  const [createReservation, {isLoading}] = useCreateReservationMutation()

  const handleClick = () => {

    if (data?.numberOfGuest > 0){
      
      reserveData.date = data.date
      reserveData.numberOfGuest = data.numberOfGuest
      createReservation(reserveData)
  }
  }
  return (
    <div
      className='bg-primary-dark text-white rounded-none p-3 border border-gray-600'
    >
      <h1>Confirm reservation</h1>
      <Button
        onClick={handleClick}
        className='bg-primary-yellow text-white normal-case hover:bg-primary-dark rounded-none'
      >Booking</Button>
    </div>
  )
}

export default BookingCard
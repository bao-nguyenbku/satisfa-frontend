import { Button } from '@mui/material';
import React from 'react'

import { useAppSelector, useAppDispatch } from '@/hooks';
import { Reservation } from '@/types/data-types';
import { useCreateReservationMutation } from '@/service/reseravation';

type Props = {}
let reserveData : Omit<Reservation, "id"> = {
  table: "63fb319e765710c5bae252f0",
  from: new Date(),
  to: new Date(),
  numberOfGuest: 0,
  owner: "6asd8f7as8fa"
}
const BookingCard = (props: Props) => {

  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => (state.reservation))
  const [createReservation, {isLoading}] = useCreateReservationMutation()

  console.log(data)
  const handleClick = () => {
    let fromString = ""
    let toString = ""
    let dateString = ""
    let monthString = ""
    let yearString = ""
    if (data?.numberOfGuest > 0){
      
      dateString = data.dateBooking.getDate().toString()
      monthString = (data.dateBooking.getMonth()+1).toString()
      yearString = (data.dateBooking.getYear() + 1900).toString()
      fromString = yearString + "-" + monthString + "-" + dateString + " "
                  + data.hourBooking.toString() + ":" + data.minuteBooking.toString()
      toString =  yearString + "-" + monthString + "-" + dateString + " "
                  + (data.hourBooking + 1).toString() + ":" + data.minuteBooking.toString()
      
      reserveData.to = new Date(toString)
      reserveData.from = new Date(fromString)
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
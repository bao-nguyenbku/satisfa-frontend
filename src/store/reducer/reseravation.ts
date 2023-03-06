import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { HYDRATE } from "next-redux-wrapper";
import { Reservation } from "@/types/data-types";
import { createReservation } from "@/service/reseravation";
import { AxiosError } from "axios";
import dayjs, { Dayjs } from 'dayjs';


const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
type ReservationStateType = {
  reservationList: Reservation[],
  dateBooking: Date,
  hourBooking: number,
  minuteBooking: number,
  numberOfGuest: number,
  tableID: string
}

const reservationList : Reservation[] = []
const dateBooking : Date = new Date()
const hourBooking : number = new Date().getHours()
const minuteBooking : number = new Date().getMinutes()
const numberOfGuest : number = 0
const tableID : string = "T0"
// Define the initial state using that type
const initialState: ReservationStateType = {
  reservationList,
  dateBooking,
  hourBooking,
  minuteBooking,
  numberOfGuest,
  tableID
};
// export const createReservation = createAsyncThunk(
//   "/reservations/createReservation",
//   async (_, { rejectWithValue }) => {
    
//   }
// );

export const reservationSlice = createSlice({
  name: "reservation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    datePicker: (initialState, action: PayloadAction<Date>) => {
      initialState.dateBooking = action.payload
    },
    getHour: (initialState, action: PayloadAction<number>) => {
      console.log(action.payload)
      initialState.hourBooking = action.payload
    },
    getMinute: (initialState, action: PayloadAction<number>) => {
      console.log(action.payload)
      initialState.minuteBooking = action.payload
    },
    guestSelect: (initialState, action: PayloadAction<number>) => {
      initialState.numberOfGuest = action.payload
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      })
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
});

export const {datePicker, getHour, getMinute, guestSelect} = reservationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReservationState= (state: RootState) => state.reservation;

export default reservationSlice.reducer;

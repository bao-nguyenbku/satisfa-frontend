import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { HYDRATE } from 'next-redux-wrapper';

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state

// Define the initial state using that type
const initialState = [
  {
    id: 1,
    text: 'First, let you pick a date for your meal. Please type with syntax: DD/MM/YYYY',
    isComplete: false,
    value: '',
  },
  {
    id: 2,
    text: 'Second, let you pick a time. Please type with syntax: hh:mm',
    isComplete: false,
    value: '',
  },
  {
    id: 3,
    text: 'Ok good. How many guests? Please type a number',
    isComplete: false,
    value: 0,
  },
];

export const reservationSlice = createSlice({
  name: 'reservation',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      const cloneState = [...state];
      cloneState[0].value = action.payload;
      cloneState[0].isComplete = true;
      state = cloneState;
    },
    setTime: (state, action: PayloadAction<string>) => {
      const cloneState = [...state];
      cloneState[1].value = action.payload;
      cloneState[1].isComplete = true;
      state = cloneState;
    },
    setGuest: (state, action: PayloadAction<number>) => {
      const cloneState = [...state];
      cloneState[2].value = action.payload;
      cloneState[2].isComplete = true;
      state = cloneState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
});

export const { setDate, setTime, setGuest } = reservationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReservationState = (state: RootState) => state.reservation;

export default reservationSlice.reducer;

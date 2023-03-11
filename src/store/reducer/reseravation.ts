import {
  createAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { HYDRATE } from 'next-redux-wrapper';
import { ReservationType } from '@/types/data-types';

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
type ReservationStateType = {
  reservationList: ReservationType[];
  numberOfGuest: number;
  tableId: string;
  date: string;
  note: string;
};

const reservationList: ReservationType[] = [];
const numberOfGuest = 0;
const tableId = 'T0';
const date = '';
const note = 'test ';

// Define the initial state using that type
const initialState: ReservationStateType = {
  reservationList,
  numberOfGuest,

  tableId,
  date,
  note,
};
// export const createReservation = createAsyncThunk(
//   "/reservations/createReservation",
//   async (_, { rejectWithValue }) => {

//   }
// );

export const reservationSlice = createSlice({
  name: 'reservation',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    guestSelect: (initialState, action: PayloadAction<number>) => {
      initialState.numberOfGuest = action.payload;
    },

    getTime: (initialState, action: PayloadAction<string>) => {
      console.log(action.payload)
      initialState.date = action.payload;
    },
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

export const { guestSelect, getTime } = reservationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReservationState = (state: RootState) => state.reservation;

export default reservationSlice.reducer;

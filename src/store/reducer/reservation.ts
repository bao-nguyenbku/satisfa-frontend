import {
  createAction,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { reservationApi } from '@/services/reservation';
import type { RootState } from '@/store';
import { HYDRATE } from 'next-redux-wrapper';
import { ReduxDataType, ICreateReservation } from '@/types/data-types';

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state

interface ReservationState {
  reservationListByFilter: ReduxDataType;
  createReservationData: Omit<ReduxDataType, 'data'> & {
    data: Omit<ICreateReservation, 'customerId'> & { customerId: string };
    code: string;
  };
}

// Define the initial state using that type
const initialState: ReservationState = {
  reservationListByFilter: {
    isLoading: false,
    isSuccess: false,
    data: [],
    error: null,
  },
  createReservationData: {
    data: {
      numberOfGuests: 0,
      tableId: '',
      date: '',
      note: '',
      customerId: '',
    },
    isLoading: false,
    isSuccess: false,
    error: null,
    code: '',
  },
};
export const getReservationByFilter = createAsyncThunk(
  'reservation/getReservationByFilter',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await dispatch(
        reservationApi.endpoints.getReservationByFilter.initiate(),
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const reservationSlice = createSlice({
  name: 'reservation',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    guestSelect: (initialState, action: PayloadAction<number>) => {
      initialState.createReservationData.data.numberOfGuests = action.payload;
    },
    getTime: (initialState, action: PayloadAction<string>) => {
      initialState.createReservationData.data.date = action.payload;
    },
    setCreateSuccess: (initialState) => {
      initialState.createReservationData.isSuccess = true;
    },
    getTableCode: (initialState, action: PayloadAction<string>) => {
      initialState.createReservationData.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.reservation,
        };
      })
      .addCase(getReservationByFilter.pending, (state) => {
        state.reservationListByFilter.isLoading = true;
      })
      .addCase(getReservationByFilter.fulfilled, (state, action) => {
        state.reservationListByFilter.isLoading = false;
        state.reservationListByFilter.error = null;
        state.reservationListByFilter.data = action.payload;
      })
      .addCase(getReservationByFilter.rejected, (state, action) => {
        state.reservationListByFilter.isLoading = false;
        state.reservationListByFilter.error = action.payload;
      });
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
});

export const { guestSelect, getTime, setCreateSuccess, getTableCode } =
  reservationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReservationState = (state: RootState) => state.reservation;
export const selectReservationListByFilter = (state: RootState) =>
  state.reservation.reservationListByFilter;

export default reservationSlice.reducer;

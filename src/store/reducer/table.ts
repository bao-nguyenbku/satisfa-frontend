import { createAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { HYDRATE } from 'next-redux-wrapper';
import { TableType } from '@/types/data-types';

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
type TableStateType = {
  tableList: TableType[];
  numberOfSeat: number;
  id: string;
  code: string;
  status: string;
};

const tableList: TableType[] = [];
const numberOfSeat = 0;
const id = '';
const code = '';
const status = 'FREE';
// Define the initial state using that type
const initialState: TableStateType = {
  tableList,
  numberOfSeat,
  id,
  code,
  status,
};
// export const createReservation = createAsyncThunk(
//   "/reservations/createReservation",
//   async (_, { rejectWithValue }) => {

//   }
// );

export const tableSlice = createSlice({
  name: 'table',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
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

// export const {} = tableSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTableState = (state: RootState) => state.table;

export default tableSlice.reducer;

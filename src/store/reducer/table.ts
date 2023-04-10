import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { HYDRATE } from 'next-redux-wrapper';
import {  ReduxDataType } from '@/types/data-types';
import { tableApi } from '@/service/table';

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
interface TableState {
  tableListByFilter: ReduxDataType;
  createdTable: ReduxDataType;
};

// Define the initial state using that type
const initialState: TableState = {
  tableListByFilter: {
    data: [],
    isSuccess: false,
    isLoading: false,
    error: null,
  },
  createdTable: {
    data: {},
    isSuccess: false,
    isLoading: false,
    error: null,
  },
};
export const getTablesByFilter = createAsyncThunk(
  'table/getTablesByFilter',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const { data } = await dispatch(
        tableApi.endpoints.getTableByFilter.initiate({
          minSeat: getState()?.reservation?.createReservationData?.numberOfGuests,
          reservationDate: getState()?.reservation?.createReservationData?.date
        })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const tableSlice = createSlice({
  name: 'table',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    })
    .addCase(getTablesByFilter.pending, (state) => {
      state.tableListByFilter.isLoading = true;
    })
    .addCase(getTablesByFilter.fulfilled, (state, action) => {
      state.tableListByFilter.isLoading = false;
      state.tableListByFilter.error = null;
      state.tableListByFilter.data = action.payload;

    })
    .addCase(getTablesByFilter.rejected, (state, action) => {
      state.tableListByFilter.isLoading = false;
      state.tableListByFilter.error = action.payload;
    })
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
});

// export const {} = tableSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTableState = (state: RootState) => state.table;
export const selectAllTableByFilter = (state: RootState) => state.table.tableListByFilter;
export default tableSlice.reducer;

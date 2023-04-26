import {
  createAsyncThunk,
  createSlice,
  createAction,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { authApi } from '@/service/auth';
import { HYDRATE } from 'next-redux-wrapper';
import { User, ReduxDataType } from '@/types/data-types';

const hydrate = createAction<RootState>(HYDRATE);

// Define a type for the slice state
export const authCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await dispatch(
        authApi.endpoints.authCurrentUserService.initiate(),
      ).unwrap();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
// Define the initial state using that type
const initialState: ReduxDataType = {
  data: {} as User | undefined,
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      })
      .addCase(authCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.data = {} as User;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(
        authCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(authCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload;
        state.data = undefined;
      });
  },
});

// export const {  } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;

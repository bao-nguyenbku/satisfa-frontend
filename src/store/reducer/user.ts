import {
  createAsyncThunk,
  createSlice,
  createAction,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { authApi } from '@/services/auth';
import { HYDRATE } from 'next-redux-wrapper';
import { User, ReduxDataType } from '@/types';
// import { userApi } from '@/services/user';

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

// export const updateAvatar = createAsyncThunk(
//   '/user',
//   async (updateUserData: any, {rejectWithValue, dispatch }) => {
//     try{
//       let uploadRes;
//       if (
//         !_.isEmpty(updateUserData.avatar) &&
//         updateUserData.images[0].file
//       ) {
//         uploadRes = await uploadFile(updateProductData.images[0].file);
//       }
//       const response = await dispatch(
//         userApi.endpoints.updateInfo.initiate(),
//       ).unwrap();
//       return response;
//       console.log(updateUserData);
//     }
//     catch (error){
//       return rejectWithValue(error);
//     }
//   }
// )

// Define the initial state using that type
const initialState: Omit<ReduxDataType, 'data'> & { data: User | null } = {
  data: null,
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
        state.data = null;
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
        state.error = action.payload as any;
        state.data = null;
      });
  },
});

// export const {  } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserState = (state: RootState) => state.user;
export const selectUserData = (state: RootState) => state.user.data;

export default userSlice.reducer;

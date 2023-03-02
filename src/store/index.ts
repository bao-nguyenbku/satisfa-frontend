import {
  Action,
  AnyAction,
  ThunkAction,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { reservationSlice } from './reducer/reseravation';
import { userSlice } from './reducer/user';
import { reservationApi } from '@/service/reseravation';
import { rtkQueryErrorLogger } from './error-handling';
import { authApi } from '@/service/auth';

const reducer = {
  [reservationSlice.name]: reservationSlice.reducer,
  [reservationApi.reducerPath]: reservationApi.reducer,
  [userSlice.name]: userSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        reservationApi.middleware,
        authApi.middleware,
        rtkQueryErrorLogger
      ),
  });

setupListeners(makeStore().dispatch);

export type ReduxErrorType = {
  statusCode: number;
  message: string;
  path?: string;
  type?: string;
};
export interface ReduxDataType {
  data: any;
  isLoading: boolean;
  isShowToast: boolean;
  error: ReduxErrorType | any;
}
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

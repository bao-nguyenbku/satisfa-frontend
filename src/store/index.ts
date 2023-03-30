import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { createWrapper } from 'next-redux-wrapper';
import { reservationSlice } from './reducer/reseravation';
import { userSlice } from './reducer/user';
import { reservationApi } from '@/service/reseravation';
import { tableSlice } from './reducer/table';
import { rtkQueryErrorLogger } from './error-handling';
import { authApi } from '@/service/auth';
import { chatbotSlice } from './reducer/chatbot';
import { tableApi } from '@/service/table';
import { productApi } from '@/service/product';
import { orderApi } from '@/service/order';
import { orderSlice } from './reducer/order';
import { cartSlice } from './reducer/cart';


const reducer = {
  [reservationSlice.name]: reservationSlice.reducer,
  [chatbotSlice.name]: reservationSlice.reducer,
  [tableSlice.name]: tableSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [tableApi.reducerPath]: tableApi.reducer,
  [reservationApi.reducerPath]: reservationApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        reservationApi.middleware,
        tableApi.middleware,
        authApi.middleware,
        productApi.middleware,
        orderApi.middleware,
        rtkQueryErrorLogger,
      ),
  });

setupListeners(makeStore().dispatch);

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

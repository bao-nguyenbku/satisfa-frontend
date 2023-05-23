import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { createWrapper } from 'next-redux-wrapper';
import { reservationSlice } from './reducer/reservation';
import { userSlice } from './reducer/user';
import { reservationApi } from '@/services/reservation';
import { tableSlice } from './reducer/table';
import { rtkQueryErrorLogger } from './error-handling';
import { authApi } from '@/services/auth';
import { chatbotSlice } from './reducer/chatbot';
import { tableApi } from '@/services/table';
import { productApi } from '@/services/product';
import { orderApi } from '@/services/order';
import { orderSlice } from './reducer/order';
import { cartSlice } from './reducer/cart';
import { reviewApi } from '@/services/review';
import { categoryApi } from '@/services/category';

const reducer = {
  [reservationSlice.name]: reservationSlice.reducer,
  [chatbotSlice.name]: chatbotSlice.reducer,
  [tableSlice.name]: tableSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [tableApi.reducerPath]: tableApi.reducer,
  [reservationApi.reducerPath]: reservationApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
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
        categoryApi.middleware,
        reviewApi.middleware,
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

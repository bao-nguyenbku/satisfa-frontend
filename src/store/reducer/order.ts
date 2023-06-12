import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { HYDRATE } from 'next-redux-wrapper';
import {
  CartItem,
  Reservation,
  OrderType,
  Order,
  PaymentType,
  PaymentStatus,
  CreatedOrder,
  TakeawayCustomer,
  CreateOrder,
  ReduxDataType,
} from '@/types';
import { createOrderService, createTempOrderService } from '@/services/order';
// import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
// import { store } from '@/store';
const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
interface OrderState {
  createOrder: Omit<ReduxDataType, 'data'> & {
    data: {
      reservation: Reservation;
      itemList: CartItem[];
      totalCost: number;
      type: OrderType;
      paymentType: PaymentType;
      customerId?: TakeawayCustomer | string;
    };
  };
  createdOrder: CreatedOrder;
}

// Define the initial state using that type
const initialState: OrderState = {
  createOrder: {
    data: {
      reservation: {} as Reservation,
      itemList: [],
      totalCost: 0,
      type: OrderType.DINE_IN,
      paymentType: PaymentType.CASH,
      customerId: {} as TakeawayCustomer,
    },
    isLoading: false,
    isSuccess: false,
    error: null,
  },
  createdOrder: {
    id: '',
    type: OrderType.DINE_IN,
    paymentStatus: PaymentStatus.UNPAID,
    paymentData: {
      type: PaymentType.CASH,
      info: {
        totalCost: 0,
        totalPay: 0,
      },
    },
  },
};

export const createOrderThunk = createAsyncThunk<
  Order,
  void,
  { state: RootState }
>(
  'order/createOrderThunk',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const data = getState()?.order?.createOrder.data;
      const createOrderData: CreateOrder = {
        reservationId: data.reservation?.id,
        items: data?.itemList,
        totalCost: data?.totalCost,
        type: data?.type,
      };
      if (data.type === OrderType.TAKEAWAY) {
        createOrderData.tempCustomer = data.customerId as TakeawayCustomer;
      } else if (data.type === OrderType.DINE_IN) {
        createOrderData.customerId = data?.reservation.customerId?.id;
      }
      const result = await dispatch(
        createOrderService.initiate(createOrderData),
      ).unwrap();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createTempOrderThunk = createAsyncThunk<
  Order,
  void,
  { state: RootState }
>(
  'order/createTempOrderThunk',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const data = getState()?.order?.createOrder.data;
      const createOrderData: CreateOrder = {
        reservationId: data.reservation?.id,
        items: data?.itemList,
        totalCost: data?.totalCost,
        type: data?.type,
      };
      if (data.type === OrderType.TAKEAWAY) {
        createOrderData.tempCustomer = data.customerId as TakeawayCustomer;
      } else if (data.type === OrderType.DINE_IN) {
        createOrderData.customerId = data?.reservation.customerId?.id;
      }
      const result = await dispatch(
        createTempOrderService.initiate(createOrderData),
      ).unwrap();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const orderSlice = createSlice({
  name: 'order',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getItemList: (state, action) => {
      state.createOrder.data.itemList = action.payload;
    },
    setReservation: (state, action) => {
      state.createOrder.data.reservation = action.payload;
    },
    saveTotalCost: (state, action: PayloadAction<number>) => {
      state.createOrder.data.totalCost = action.payload;
    },
    setOrderType: (state, action) => {
      state.createOrder.data.type = action.payload;
    },
    setPaymentType: (state, action) => {
      state.createOrder.data.paymentType = action.payload;
    },
    setTakeawayInformation: (
      state,
      action: PayloadAction<TakeawayCustomer>,
    ) => {
      if (state.createOrder.data.type === OrderType.TAKEAWAY) {
        state.createOrder.data.customerId = action.payload;
      }
    },
    reset: (state) => {
      state.createOrder = {
        data: {
          reservation: {} as Reservation,
          itemList: [],
          totalCost: 0,
          type: OrderType.DINE_IN,
          paymentType: PaymentType.CASH,
        },
        isLoading: false,
        isSuccess: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      })
      .addCase(createOrderThunk.pending, (state) => {
        state.createOrder.isLoading = true;
        state.createOrder.isSuccess = true;
        state.createOrder.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.createOrder.isLoading = false;
        state.createOrder.isSuccess = true;
        state.createOrder.error = null;
        // data for paid order
        state.createdOrder.id = action.payload.id;
        state.createdOrder.type = action.payload.type;
        state.createdOrder.paymentStatus = PaymentStatus.PAID;
        state.createdOrder.paymentData.info.totalCost =
          action.payload.totalCost;
        state.createdOrder.paymentData.info.totalPay = action.payload.totalCost;
      })
      .addCase(createTempOrderThunk.fulfilled, (state, action) => {
        state.createdOrder.id = action.payload.id;
        state.createdOrder.type = action.payload.type;
        state.createdOrder.paymentStatus = PaymentStatus.PAID;
        state.createdOrder.paymentData.info.totalCost =
          action.payload.totalCost;
        state.createdOrder.paymentData.info.totalPay = action.payload.totalCost;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.createOrder.isLoading = false;
        state.createOrder.isSuccess = false;
        state.createOrder.error = action.payload as any;
      });
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
});

export const {
  getItemList,
  setReservation,
  saveTotalCost,
  reset,
  setOrderType,
  setPaymentType,
  setTakeawayInformation,
} = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentReservation = (state: RootState) =>
  state.order.createOrder.data.reservation;
export const selectCreateOrder = (state: RootState) => state.order.createOrder;
export const selectCreatedOrder = (state: RootState) =>
  state.order.createdOrder;
export default orderSlice.reducer;

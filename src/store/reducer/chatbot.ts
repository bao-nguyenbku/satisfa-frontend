import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { RootState } from '@/store';
// import { ReduxDataType } from '@/types/redux-type';
import { HYDRATE } from 'next-redux-wrapper';
import { CartState } from './cart';
import {
  CreateOrder,
  CartItem,
  OrderType,
  TakeawayCustomer,
  BotStep,
  Reservation,
  ErrorType,
  CreateReservation,
  Table,
} from '@/types';
import { reservationApi } from '@/services/reservation';
import dayjs from 'dayjs';
import { getTablesByFilter } from '@/services/table';

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
type ChatbotState = {
  reservation: {
    // Change steps structure
    steps: BotStep;
    created: CreateReservation;
  };
  order: {
    steps: BotStep;
    created: CreateOrder;
  };
};
// Define the initial state using that type
const initialState: ChatbotState = {
  reservation: {
    steps: {
      1: {
        isComplete: false,
      },
      2: {
        isComplete: false,
      },
      3: {
        isComplete: false,
      },
      4: {
        isComplete: false,
      },
    },
    created: {
      customerId: '',
      tableId: '',
      note: '',
      date: '',
      numberOfGuests: 0,
    },
  },
  order: {
    steps: {
      1: {
        isComplete: false,
      },
      2: {
        isComplete: false,
      },
      3: {
        isComplete: false,
      },
      4: {
        isComplete: false,
      },
      5: {
        isComplete: false,
      },
      6: {
        isComplete: false,
      },
      7: {
        isComplete: false,
      },
      8: {
        isComplete: false,
      },
    },
    created: {
      reservationId: '',
      customerId: '',
      items: [],
      totalCost: 0,
      type: OrderType.DINE_IN,
      tempCustomer: {
        name: '',
        phone: '',
        takingTime: '',
      },
    },
  },
};
// export const createReservation = createAsyncThunk(
//   "/reservations/createReservation",
//   async (_, { rejectWithValue }) => {

//   }
// );
export const getTablesByFilterThunk = createAsyncThunk<
  Table[] | unknown,
  void,
  {
    state: RootState;
  }
>(
  'chatbot/getTablesByFilterThunk',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await dispatch(
        getTablesByFilter.initiate({
          minSeat: getState().chatbot.reservation.created.numberOfGuests,
          reservationDate: getState().chatbot.reservation.created.date,
        }),
      ).unwrap();
      if (response) {
        return response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getReservationByUser = createAsyncThunk<
  Reservation[] | ErrorType,
  void,
  {
    state: RootState;
  }
>(
  'chatbot/getReservationByUser',
  async (un, { getState, dispatch, rejectWithValue }) => {
    const user = getState().user;
    if (_.isEmpty(user.data)) {
      return rejectWithValue({
        statusCode: 401,
        message: 'You must sign in to book a table',
      });
    }
    try {
      const response = await dispatch(
        reservationApi.endpoints.getReservationByFilter.initiate({
          user: user.data.id,
        }),
      );
      if (!response.isLoading && response.isSuccess && response.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const setOrderItemsThunk = createAsyncThunk<
  CartState,
  void,
  {
    state: RootState;
  }
>('chatbot/setOrderItems', async (un, { getState, dispatch }) => {
  const cart = getState().cart;
  if (cart.itemList.length > 0) {
    dispatch(setOrderItems(cart.itemList));
  }
  return cart;
});

export const chatbotSlice = createSlice({
  name: 'chatbot',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setReservationDate: (state, action: PayloadAction<string>) => {
      state.reservation.created.date = action.payload;
      state.reservation.steps[1].isComplete = true;
    },
    setReservationTime: (state, action: PayloadAction<string>) => {
      const date = state.reservation.created.date;
      state.reservation.created.date = dayjs(
        `${date} ${action.payload}`,
      ).toISOString();
      state.reservation.steps[2].isComplete = true;
    },
    setReservationGuest: (state, action: PayloadAction<number>) => {
      state.reservation.created.numberOfGuests = action.payload;
      state.reservation.steps[3].isComplete = true;
    },
    setSelectTable: (state, action: PayloadAction<string>) => {
      state.reservation.created.tableId = action.payload;
      state.reservation.steps[4].isComplete = true;
    },
    resetCreateReservation: (state) => {
      state.reservation.created = {
        customerId: '',
        tableId: '',
        note: '',
        date: '',
        numberOfGuests: 0,
      };
      Object.keys(state.reservation.steps).forEach((key) => {
        state.reservation.steps[key as any].isComplete = false;
      });
    },
    // For Order feature
    setOrderItems: (state, action: PayloadAction<CartItem[]>) => {
      state.order.created.items = action.payload;
      state.order.steps[1].isComplete = true;
    },
    setOrderType: (state, action: PayloadAction<OrderType>) => {
      state.order.created.type = action.payload;
      state.order.steps[2].isComplete = true;
    },
    setTakeawayName: (state, action: PayloadAction<string>) => {
      (state.order.created.tempCustomer as TakeawayCustomer)['name'] =
        action.payload;
      state.order.steps[5].isComplete = true;
    },
    setTakeawayPhone: (state, action: PayloadAction<string>) => {
      (state.order.created.tempCustomer as TakeawayCustomer).phone =
        action.payload;
      state.order.steps[6].isComplete = true;
    },
    setTakeawayTime: (state, action: PayloadAction<string>) => {
      (state.order.created.tempCustomer as TakeawayCustomer).takingTime =
        action.payload;
      state.order.steps[7].isComplete = true;
    },
    setReservationDinein: (state, action: PayloadAction<Reservation>) => {
      if (state.order.created.type == OrderType.DINE_IN) {
        state.order.created.reservationId = action.payload.id;
        state.order.created.customerId = action.payload.customerId.id;
        state.order.steps[3].isComplete = true;
      }
    },
    resetCreateOrder: (state) => {
      state.order.created = {
        reservationId: '',
        customerId: '',
        items: [],
        totalCost: 0,
        type: OrderType.DINE_IN,
        tempCustomer: {
          name: '',
          phone: '',
          takingTime: '',
        },
      };
      Object.keys(state.order.steps).forEach((key) => {
        state.order.steps[key as any].isComplete = false;
      });
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.chatbot,
      };
    });
  },
});

export const {
  setReservationDate,
  setReservationTime,
  setReservationGuest,
  setOrderItems,
  setOrderType,
  setTakeawayName,
  setTakeawayPhone,
  setTakeawayTime,
  resetCreateOrder,
  resetCreateReservation,
  setReservationDinein,
} = chatbotSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBotReservationState = (state: RootState) =>
  state.chatbot.reservation;

export const selectBotOrderState = (state: RootState) => state.chatbot.order;

export const selectCreateBotOrderData = (state: RootState) =>
  state.chatbot.order.created;
// export const selectTakeawayOrderCompletion = (state: RootState) => {

// };
export default chatbotSlice.reducer;

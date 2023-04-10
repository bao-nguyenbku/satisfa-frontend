import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
// import * as _ from 'lodash';
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
} from '@/types/data-types';
// import { ChatBotType } from '@/types/data-types';

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
type ChatbotState = {
  reservation: {
    // Change steps structure
    steps: BotStep;
    created: CreateOrder;
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
        text: 'First, let you pick a date for your meal. Please type with syntax: DD/MM/YYYY',
        isComplete: false,
      },
      2: {
        text: 'Second, let you pick a time. Please type with syntax: hh:mm',
        isComplete: false,
      },
      3: {
        text: 'Ok good. How many guests? Please type a number',
        isComplete: false,
      },
      4: {
        text: 'Now, we will show you availables table that match your requirement on the screen, pick one table.',
        isComplete: false,
      },
    },
    created: {},
  },
  order: {
    steps: {
      1: {
        text: 'First. Please choose food on the screen and check your cart. If you confirm with it, type "ok" on the message box😉',
        isComplete: false,
      },
      2: {
        text: 'I saw your order cart. Would you like to dine-in or takeaway? (type "dine in" or "takeaway")',
        isComplete: false,
      },
    },
    created: {}
  },
};
// export const createReservation = createAsyncThunk(
//   "/reservations/createReservation",
//   async (_, { rejectWithValue }) => {

//   }
// );
export const setOrderItemsThunk = createAsyncThunk<
  CartState,
  void,
  {
    state: RootState;
  }
>('chatbot/setOrderItems', async (_, { getState, dispatch }) => {
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
    setDate: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      const cloneState = state.reservation.steps;
      console.log(cloneState)
      cloneState[1].text = action.payload;
      cloneState[1].isComplete = true;
      state.reservation.steps = cloneState;
    },
    setTime: (state, action: PayloadAction<string>) => {
      const cloneState = state.reservation.steps;
      cloneState[2].text = action.payload;
      cloneState[2].isComplete = true;
      state.reservation.steps = cloneState;
    },
    setGuest: (state, action: PayloadAction<number>) => {
      const cloneState = state.reservation.steps;
      cloneState[3].text = action.payload;
      cloneState[3].isComplete = true;
      state.reservation.steps = cloneState;
    },
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
  setDate,
  setTime,
  setGuest,
  setOrderItems,
  setOrderType,
  setTakeawayName,
  setTakeawayPhone,
  setTakeawayTime,
  resetCreateOrder,
} = chatbotSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBotReservationState = (state: RootState) =>
  state.chatbot.reservation;

export const selectBotOrderState = (state: RootState) => state.chatbot.order;

export const selectCreateBotOrderData = (state: RootState) => state.chatbot.order.created;
// export const selectTakeawayOrderCompletion = (state: RootState) => {

// };
export default chatbotSlice.reducer;

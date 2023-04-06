import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '@/store';
// import { ReduxDataType } from '@/types/redux-type';
import { HYDRATE } from 'next-redux-wrapper';
// import { ChatBotType } from '@/types/data-types';

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state

// Define the initial state using that type
const initialState = {
  reservation: {
    steps: [
      {
        id: 1,
        text: 'First, let you pick a date for your meal. Please type with syntax: DD/MM/YYYY',
        isComplete: false,
        value: '',
      },
      {
        id: 2,
        text: 'Second, let you pick a time. Please type with syntax: hh:mm',
        isComplete: false,
        value: '',
      },
      {
        id: 3,
        text: 'Ok good. How many guests? Please type a number',
        isComplete: false,
        value: 0,
      },
    ],
    created: {},
  },
  order: {
    steps: [
      {
        id: 1,
        text: 'First. Please choose food on the screen and check your cart. If you confirm with it, type "ok" on the message box😉',
        isComplete: false,
      },
      {
        id: 2,
        text: 'I saw your order cart. Would you like to dine-in or takeaway?',
        isComplete: false,
      },
      // In case of Dine-in, use this step
      {
        id: 3,
        text: 'Please choose your reservation.',
        isComplete: false,
      },
      // In case no reservation
      {
        id: 4,
        text: 'Sorry, you do not have any reservation. Please make a reservation first or takeaway the order.',
        isComplete: false,
      },
      // In casse of customer chose takeaway
      {
        id: 5,
        text: 'Ok. I am confirming your order. Now, please look at widget below on the chat area. It the order information is right, type ok',
        isComplete: false,
      },
      {
        id: 6,
        text: 'Ok. I am confirming your order. Now, please look at widget below on the chat area. It the order information is right, type ok',
        isComplete: false,
      },
    ],
    created: {
      
    },
  },
};
// export const createReservation = createAsyncThunk(
//   "/reservations/createReservation",
//   async (_, { rejectWithValue }) => {

//   }
// );
export const setOrderItems = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
  }
>('chatbot/setOrderItems', async (_, { getState }) => {
  console.log(getState());
  return;
});

export const chatbotSlice = createSlice({
  name: 'chatbot',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      const cloneState = [...state.reservation.steps];
      cloneState[0].value = action.payload;
      cloneState[0].isComplete = true;
      state.reservation.steps = cloneState;
    },
    setTime: (state, action: PayloadAction<string>) => {
      const cloneState = [...state.reservation.steps];
      cloneState[1].value = action.payload;
      cloneState[1].isComplete = true;
      state.reservation.steps = cloneState;
    },
    setGuest: (state, action: PayloadAction<number>) => {
      const cloneState = [...state.reservation.steps];
      cloneState[2].value = action.payload;
      cloneState[2].isComplete = true;
      state.reservation.steps = cloneState;
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

export const { setDate, setTime, setGuest } = chatbotSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBotReservationState = (state: RootState) =>
  state.chatbot.reservation.steps;

export const selectBotOrderState = (state: RootState) =>
  state.chatbot.order.steps;
export default chatbotSlice.reducer;

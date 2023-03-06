import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { HYDRATE } from "next-redux-wrapper";
import { ChatBotType } from "@/types/data-types";
import { ReduxDataType } from "@/store";

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
type ReservationStateType = {
  chatbotList: ChatBotType[]
}

const chatbotList : ChatBotType[] = []

// Define the initial state using that type
const initialState: ReservationStateType = {
    chatbotList,
};
// export const createReservation = createAsyncThunk(
//   "/reservations/createReservation",
//   async (_, { rejectWithValue }) => {
    
//   }
// );

export const chatbotSlice = createSlice({
  name: "chatbot",
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
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
});

export const {} = chatbotSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReservationState= (state: RootState) => state.reservation;

export default chatbotSlice.reducer;

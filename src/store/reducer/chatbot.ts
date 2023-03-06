import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, ReduxDataType } from "@/store";
import { HYDRATE } from "next-redux-wrapper";
import { ChatBotType } from "@/types/data-types";

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
type ChatbotState = {
  chatbotList: ReduxDataType & {
    data: ChatBotType | undefined
  }
}


// Define the initial state using that type
const initialState: ChatbotState = {
    chatbotList: {
      data: undefined,
      isLoading: false,
    }
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
export const selectChatbotState= (state: RootState) => state.chatbot;

export default chatbotSlice.reducer;

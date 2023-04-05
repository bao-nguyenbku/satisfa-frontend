import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { HYDRATE } from 'next-redux-wrapper';
import { Product, CartItem } from '@/types/data-types';
import { getCookie, setCookie } from 'cookies-next';


const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
interface CartState {
  itemList: CartItem[];
  totalCost: number;
  totalQty: number;
}

// Define the initial state using that type
const initialState: CartState = {
  itemList: [],
  totalCost: 0,
  totalQty: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const cloneData = [...state.itemList];
      const foundItemIdx = cloneData.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (foundItemIdx === -1) {
        cloneData.push({
          ...action.payload,
          qty: 1,
        });
      } else {
        cloneData[foundItemIdx].qty += 1;
      }
      cartSlice.caseReducers.increaseTotalCost(state, {
        type: 'increaseTotalCost',
        payload: action.payload.price,
      });
      // cartSlice.actions.increaseTotalCost(action.payload.price);
      setCookie('myCart', cloneData);
      const cartItems = getCookie('myCart');
      if (cartItems) {
        state.itemList = JSON.parse(cartItems as string);
      }
      state.totalQty += 1;
    },
    clearAll: (state) => {
      state.itemList = [];
      state.totalQty = 0;
    },
    increaseQty: (state, action: PayloadAction<string>) => {
      const cloneData = [...state.itemList];
      const foundItemIdx = cloneData.findIndex(
        (item) => item.id === action.payload,
      );
      if (foundItemIdx === -1) {
        return;
      }
      cloneData[foundItemIdx].qty += 1;
      setCookie('myCart', cloneData);
      const cartItems = getCookie('myCart');
      if (cartItems) {
        state.itemList = JSON.parse(cartItems as string);
      }
      state.totalQty += 1;
    },
    decreaseQty: (state, action: PayloadAction<string>) => {
      const cloneData = [...state.itemList];
      const foundItemIdx = cloneData.findIndex(
        (item) => item.id === action.payload,
      );
      if (foundItemIdx === -1) {
        return;
      }
      cloneData[foundItemIdx].qty -= cloneData[foundItemIdx].qty === 0 ? 0 : 1;
      setCookie('myCart', cloneData);
      const cartItems = getCookie('myCart');
      if (cartItems) {
        state.itemList = JSON.parse(cartItems as string);
      }
      state.totalQty -= 1;
    },
    increaseTotalCost: (state, action: PayloadAction<number>) => {
      state.totalCost += action.payload;
    },
    decreaseTotalCost: (state, action: PayloadAction<number>) => {
      state.totalCost -= state.totalCost <= action.payload ? 0 : action.payload;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const cloneData = [...state.itemList];
      const filterData = cloneData.filter((item) => item.id != action.payload);
      setCookie('myCart', filterData);
      const cartItems = getCookie('myCart');
      if (cartItems) {
        state.itemList = JSON.parse(cartItems as string);
      }
    },
    setCookieToCart: (state) => {
      const cartItems = getCookie('myCart');
      if (cartItems) {
        state.itemList = JSON.parse(cartItems as string);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.cart,
      };
    });
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
});

export const {
  addItem,
  increaseQty,
  decreaseQty,
  clearAll,
  removeItem,
  setCookieToCart,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartState = (state: RootState) => state.cart;

export const selectAllItem = (state: RootState) => state.cart.itemList;
export const selectTotalQty = (state: RootState) =>
  state.cart.itemList.reduce((prev, curr) => prev + curr.qty, 0);
export const selectTotalCost = (state: RootState) =>
  state.cart.itemList.reduce((prev, curr) => prev + curr.price * curr.qty, 0);

export const selectIsEmptyCart = (state: RootState) =>
  state.cart.itemList.length === 0;
export default cartSlice.reducer;

import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { HYDRATE } from 'next-redux-wrapper';
import { Product, CartItem } from '@/types';
import { deleteCookie, setCookie } from 'cookies-next';
import { CART_COOKIE_KEY } from '@/constants';
import { getDataFromCookie } from '@/utils';

const hydrate = createAction<RootState>(HYDRATE);
// Define a type for the slice state
export interface CartState {
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
      if (!action.payload) return;
      const cloneData = [...state.itemList];
      const foundItemIdx = cloneData.findIndex(
        (item) => item.id === action.payload?.id,
      );

      if (foundItemIdx === -1) {
        cloneData.push({
          ...action.payload,
          qty: 1,
        });
      } else {
        cloneData[foundItemIdx].qty += 1;
      }
      setCookie(
        CART_COOKIE_KEY,
        {
          itemList: cloneData,
          totalCost: state.totalCost + action.payload.price,
          totalQty: state.totalQty + 1,
        },
        {
          sameSite: 'strict',
        },
      );
      state.itemList = cloneData;
      state.totalCost += action.payload.price;
      state.totalQty += 1;
    },
    clearAll: (state) => {
      state.itemList = [];
      state.totalQty = 0;
      state.totalCost = 0;
      deleteCookie(CART_COOKIE_KEY);
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
      setCookie(CART_COOKIE_KEY, {
        itemList: cloneData,
        totalCost: state.totalCost + cloneData[foundItemIdx].price,
        totalQty: state.totalQty + 1,
      });
      state.totalCost += cloneData[foundItemIdx].price;
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
      const minus = cloneData[foundItemIdx].qty === 0 ? 0 : 1;
      cloneData[foundItemIdx].qty -= minus;
      setCookie(CART_COOKIE_KEY, {
        itemList: cloneData,
        totalCost:
          state.totalCost -
          cloneData[foundItemIdx].price * cloneData[foundItemIdx].qty,
        totalQty: state.totalQty - minus,
      });
      state.totalCost -=
        cloneData[foundItemIdx].price * cloneData[foundItemIdx].qty;
      state.totalQty -= minus;
    },
    increaseTotalCost: (state, action: PayloadAction<number>) => {
      state.totalCost += action.payload;
    },
    decreaseTotalCost: (state, action: PayloadAction<number>) => {
      state.totalCost -= state.totalCost <= action.payload ? 0 : action.payload;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const cloneData = [...state.itemList];
      const removeData = cloneData.find((item) => item.id === action.payload);
      if (!removeData) return;
      const filterData = cloneData.filter((item) => item.id != action.payload);
      setCookie(CART_COOKIE_KEY, {
        itemList: filterData,
        totalCost: state.totalCost - removeData.price * removeData.qty,
        totalQty: state.totalQty - removeData.qty,
      });
      state.itemList = filterData;
      state.totalCost -= removeData.price * removeData.qty;
      state.totalQty -= removeData.qty;
    },
    recoverCartFromCookie: (state) => {
      const data = getDataFromCookie(CART_COOKIE_KEY);
      if (data) {
        state.itemList = data.itemList;
        state.totalCost = data.totalCost;
        state.totalQty = data.totalQty;
      }
    },
  },
  extraReducers: (builder) => {
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export const {
  addItem,
  increaseQty,
  decreaseQty,
  clearAll,
  removeItem,
  recoverCartFromCookie,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartState = (state: RootState) => state.cart;

export const selectAllItem = (state: RootState) => state.cart.itemList;
export const selectTotalQty = (state: RootState) => state.cart.totalQty;
export const selectTotalCost = (state: RootState) =>
  state.cart.itemList.reduce((prev, curr) => prev + curr.price * curr.qty, 0);

export const selectIsEmptyCart = (state: RootState) =>
  state.cart.itemList.length === 0;
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const cart = JSON.parse(localStorage.getItem('cart'));

const initialState = cart ?? {
  cartItems: [],
  cartItemsPrices: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      state.cartItems.push(action.payload.game);
      state.cartItemsPrices.push(action.payload.pricesList);
      state.totalPrice += action.payload.pricesList.price_new;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    remove: (state, action) => {
      const num = state.cartItems.findIndex(item => item.id === action.payload);
      state.totalPrice -= state.cartItemsPrices[num].price_new;
      state.cartItems.splice(num, 1);
      state.cartItemsPrices.splice(num, 1);
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice.reducer;

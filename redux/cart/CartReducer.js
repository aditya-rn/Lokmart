import {createSlice} from '@reduxjs/toolkit';
import {addToCart} from '../../src/api/product/ProductApiRequests';

const CartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cart: {
      // discountedTotal: 1061,
      // id: 21,
      // products: [
      //   {
      //     id: 1,
      //     quantity: 2,
      //   },
      //   {
      //     id: 56,
      //     quantity: 3,
      //   },
      // ],
      // total: 1218,
      // totalProducts: 2,
      // totalQuantity: 5,
      // userId: 1,
    },
  },
  reducers: {
    updateCart: (state, action) => {
      return {cart: {...action.payload.cart}};
    },
  },
});

export const {updateCart, removeFromCartSlice} = CartSlice.actions;
export default CartSlice.reducer;

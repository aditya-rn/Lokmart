import {configureStore} from '@reduxjs/toolkit';
import AuthenticationReducer from './authentication/AuthenticationReducer';
import CartReducer from './cart/CartReducer';

export default store = configureStore({
  reducer: {
    authentication: AuthenticationReducer,
    cart: CartReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from './paiement/paymentSlice'; // Adjust the import path as necessary

const store = configureStore({
  reducer: {
    payments: paymentReducer,
  },
});

export default store;
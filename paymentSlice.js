import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payments: [],
};

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    addPayment: (state, action) => {
      const newPayment = action.payload;
      if (state.payments.length > 0) {
        // If there are existing payments, subtract the new amount from the first payment
        const firstPayment = state.payments[0];
        firstPayment.amount -= newPayment.amount;
      }
      state.payments.push(newPayment);
    },
    editPayment: (state, action) => {
      const { index, payment } = action.payload;
      const previousPayment = state.payments[index];
      const previousAmount = previousPayment.amount;

      // Update the payment at the specified index
      state.payments[index] = payment;

      // Adjust the first payment's amount
      if (index === 0) {
        // If editing the first payment, set the new amount directly
        state.payments[0] = payment; // Update the first payment directly
      } else {
        // If editing any other payment, adjust the first payment's amount
        const firstPayment = state.payments[0];
        firstPayment.amount += previousAmount - payment.amount; // Adjust the first payment's amount
      }
    },
    deletePayment: (state, action) => {
      const index = action.payload;
      const paymentToDelete = state.payments[index];
      state.payments.splice(index, 1); // Remove the payment

      // If there are remaining payments and the deleted payment is not the first one
      if (state.payments.length > 0 && index !== 0) {
        const firstPayment = state.payments[0];
        firstPayment.amount += paymentToDelete.amount; // Restore original amount
      } else if (index === 0 && state.payments.length > 0) {
        // If the first payment is deleted, we need to adjust the first payment's amount
        const newFirstPayment = state.payments[0];
        if (newFirstPayment) {
          newFirstPayment.amount += paymentToDelete.amount; // Restore original amount
        }
      }
    },
  },
});

// Export actions
export const { addPayment, editPayment, deletePayment } = paymentSlice.actions;

// Export reducer
export default paymentSlice.reducer;
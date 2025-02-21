import React, { useState } from 'react';
import dayjs from 'dayjs'; // Import dayjs
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment, editPayment, deletePayment } from './paymentSlice'; // Adjust the import path
import { MdDelete } from 'react-icons/md'; // Import the MdDelete icon
import { CiEdit } from "react-icons/ci";

const PaymentForm = () => {
  const [paymentMode, setPaymentMode] = useState('Crédit');
  const [amount, setAmount] = useState(0.0);
  const [dueDate, setDueDate] = useState(dayjs().format('YYYY-MM-DD')); // Set initial due date using dayjs
  const [chequeOrEffet, setChequeOrEffet] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Get payments from Redux store
  const payments = useSelector((state) => state.payments.payments);
  const dispatch = useDispatch(); // Get dispatch function

  const modesPaiement = [
    { id: 1, name: 'Crédit' },
    { id: 2, name: 'Espece' },
    { id: 3, name: 'Cheque' },
    { id: 4, name: 'Effet de commerce' },
    { id: 5, name: 'Virement' },
  ];

  const handlePaymentModeChange = (event) => {
    const selectedMode = event.target.value;
    setPaymentMode(selectedMode);
    setChequeOrEffet(''); // Reset the cheque or effet input when changing payment mode
  };

  const handleButtonClick = () => {
    const newPayment = {
      paymentMode,
      amount: parseFloat(amount), // Ensure amount is a number
      dueDate,
      chequeOrEffet,
    };

    if (editIndex !== null) {
      // Update an existing payment
      dispatch(editPayment({ index: editIndex, payment: newPayment }));
      setEditIndex(null);
    } else {
      // Add new payment
      dispatch(addPayment(newPayment));
    }

    // Reset the form fields
    setAmount(0.0);
    setDueDate(dayjs().format('YYYY-MM-DD')); // Reset due date to today using dayjs
    setChequeOrEffet('');
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleChequeOrEffetChange = (event) => {
    setChequeOrEffet(event.target.value);
  };

  const handleDeletePayment = (index) => {
    dispatch(deletePayment(index)); // Dispatch the deletePayment action
  };

  const handleEditPayment = (index) => {
    const paymentToEdit = payments[index];
    setPaymentMode(paymentToEdit.paymentMode);
    setAmount(paymentToEdit.amount);
    setDueDate(paymentToEdit.dueDate); // Set the date for editing
    setChequeOrEffet(paymentToEdit.chequeOrEffet);
    setEditIndex(index);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-muted">Paiement :</h2>
      <div className="d-flex">
        <div style={{ width: '30%' }} className="p-4 shadow">
          <div className="mb-3">
            <label htmlFor="paymentMode" className="form-label">Mode paiement:</label>
            <select id="paymentMode" className="form-select" value={paymentMode} onChange={handlePaymentModeChange}>
              {modesPaiement.map((mode) => (
                <option key={mode.id} value={mode.name}>
                  {mode.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Montant:</label>
            <input
              type="number"
              id="amount"
              className="form-control"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Echéance:</label>
            <input
              type="date"
              id="dueDate"
              className="form-control"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </div>
          {(paymentMode === 'Cheque' || paymentMode === 'Effet de commerce') && (
            <div className="mb-3">
              <label htmlFor="chequeOrEffet" className="form-label">N° Cheque ou Effet:</label>
              <input
                type="text"
                id="chequeOrEffet"
                className="form-control"
                value={chequeOrEffet}
                onChange={handleChequeOrEffetChange}
              />
            </div>
          )}
          <button className="btn btn-success" onClick={handleButtonClick}>
            {editIndex !== null ? 'Modifier le paiement' : 'Ajouter le paiement'}
          </button>
        </div>

        {/* Render the table of payments */}
        {payments.length > 0 && (
          <div style={{ width: '70%' }} className="p-4">
            <h3 className="text-center text-muted">Liste des paiements:</h3>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Mode de paiement:</th>
                  <th>Montant:</th>
                  <th>Echéance:</th>
                  <th>N° Cheque ou Effet:</th>
                  <th>Actions:</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.paymentMode}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.dueDate}</td>
                    <td>{payment.chequeOrEffet}</td>
                    <td>
                      <button className="btn btn-warning me-2" onClick={() => handleEditPayment(index)}>
                      <CiEdit />
                      </button>
                      <button className="btn btn-danger" onDoubleClick={() => handleDeletePayment(index)}>
                        <MdDelete /> 
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
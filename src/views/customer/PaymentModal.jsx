import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../redux/slices/orderSlice';
import Swal from "sweetalert2";

const PaymentModal = ({ onClose, user, selectedItems }) => {
  const dispatch = useDispatch();
  const [cardInfo, setCardInfo] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { nameOnCard, cardNumber, expiryDate, cvc } = cardInfo;
    const cardNumberPattern = /^[0-9]{16}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvcPattern = /^[0-9]{3}$/;

    if (!nameOnCard || !cardNumber || !expiryDate || !cvc) {
      Swal.fire('Error', 'Please fill in all fields.', 'error');
      return false;
    }
    if (!cardNumberPattern.test(cardNumber.replace(/\s+/g, ''))) {
      Swal.fire('Error', 'Please enter a valid 16-digit card number.', 'error');
      return false;
    }
    if (!expiryDatePattern.test(expiryDate)) {
      Swal.fire('Error', 'Please enter a valid expiry date in MM/YY format.', 'error');
      return false;
    }
    if (!cvcPattern.test(cvc)) {
      Swal.fire('Error', 'Please enter a valid 3-digit CVC/CVV.', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      selectedItems.forEach(item => {
        const orderData = {
          userId: user.userId,
          productId: item.productId,
          quantity: item.quantity,
          orderDate: new Date().toISOString().slice(0, 10),
          price: item.price,
          status: 'Pending',
          name: user.name,
          contact: user.contact,
          address: user.address,
          card_name: cardInfo.nameOnCard,
          card_number: cardInfo.cardNumber,
          card_expiry: cardInfo.expiryDate,
          card_cvc: cardInfo.cvc,
        };
        dispatch(createOrder(orderData));
      });
      onClose();
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Payment Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <label className="block text-gray-700 mt-2">Contact</label>
            <input
              type="text"
              name="contact"
              value={user.contact}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <label className="block text-gray-700 mt-2">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">Card Information</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Name on Card</label>
            <input
              type="text"
              name="nameOnCard"
              placeholder="Name on Card"
              value={cardInfo.nameOnCard}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <label className="block text-gray-700 mt-2">Credit/Debit Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="0000-0000-0000-0000"
              value={cardInfo.cardNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <label className="block text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardInfo.expiryDate}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">CVC/CVV</label>
                <input
                  type="text"
                  name="cvc"
                  placeholder="123"
                  value={cardInfo.cvc}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentModal;

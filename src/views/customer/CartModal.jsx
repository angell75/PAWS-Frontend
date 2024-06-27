import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, updateCartItemQuantity, deleteCartItem } from '../../redux/slices/cartSlice';
import { Icon } from '@iconify/react';
import myPetBack from '../../assets/mypet-back.png';
import notFoundImage from '../../assets/not-found.png';
import PaymentModal from './PaymentModal';
import { useNavigate } from 'react-router-dom';

const CartModal = () => {
  const dispatch = useDispatch();
  const { items: cartItems, status, error } = useSelector((state) => state.carts);
  const currentUser = useSelector((state) => state.auth.user);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // Filter cart items for the current user
  const userCartItems = Array.isArray(cartItems) ? cartItems.filter(item => item.userId === currentUser.userId) : [];

  const handleSelectItem = (item) => {
    setSelectedItems(prevState =>
      prevState.includes(item)
        ? prevState.filter(selected => selected.cartId !== item.cartId)
        : [...prevState, item]
    );
  };

  const handleQuantityChange = (item, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItemQuantity({ cartId: item.cartId, quantity }));
  };

  const handleDeleteItem = (item) => {
    dispatch(deleteCartItem(item.cartId));
    setSelectedItems(selectedItems.filter(selected => selected.cartId !== item.cartId));
  };

  // Calculate subtotal for selected items
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const handleConfirmPayment = () => {
    setShowPaymentModal(false);
    navigate('/myorder'); 
  };

  if (status === 'loading' && userCartItems.length === 0) {
    return <p className='text-3xl text-center pt-10'>Loading cart items...</p>;
  }

  if (status === 'failed') {
    return <p className='text-3xl text-center pt-10'>There is some problem with {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${myPetBack})` }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Cart</h1>
        </div>
      </section>
      
      {/* Cart Content */}
      <div className="flex flex-col items-center py-10 px-4 bg-petBg">
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white p-6 rounded-md shadow-md">
          <div className="flex-1">
            {userCartItems.length === 0 ? (
              <div className="text-center mt-4">
                <h2 className="text-2xl text-gray-800">Your Cart is Empty!</h2>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => navigate('/customer/shopnow')}
                >
                  Shop Now
                </button>
              </div>
            ) : (
              userCartItems.map((item) => {
                const price = parseFloat(item.price);
                return (
                  <div key={item.cartId} className="flex flex-col md:flex-row items-center border-b py-4">
                    <div className="flex items-center mb-4 md:mb-0">
                      <input
                        type="checkbox"
                        className="mr-4"
                        checked={selectedItems.includes(item)}
                        onChange={() => handleSelectItem(item)}
                      />
                      <img src={item.productImage || notFoundImage} alt={item.productName} className="w-16 h-16 md:w-24 md:h-24 object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h2 className="font-semibold text-lg md:text-xl">{item.productName}</h2>
                      <div className="text-gray-600 capitalize">
                        <p>{item.productCategory || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-lg md:text-xl font-semibold">
                        ${!isNaN(price) ? (price * item.quantity).toFixed(2) : '0.00'}
                      </span>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleDeleteItem(item)}
                      >
                        <Icon icon="ic:baseline-close" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="w-full md:w-1/3 mt-6 md:mt-0 md:ml-6 bg-gray-50 p-4 rounded-md">
            <h2 className="font-bold text-lg md:text-xl mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (16%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg md:text-xl mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 ${total === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => total !== 0 && setShowPaymentModal(true)}
              disabled={total === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          user={currentUser}
          selectedItems={selectedItems}
          total={total} // Pass total to the PaymentModal
          onConfirm={handleConfirmPayment}
        />
      )}
    </div>
  );
};

export default CartModal;

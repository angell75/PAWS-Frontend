import React from 'react';
import { Icon } from '@iconify/react';
import myPetBack from '../../assets/mypet-back.png';

const CartModal = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Shadowtech Eclipse Sneakers',
      image: 'https://via.placeholder.com/150',
      color: 'Black',
      size: 'US 8',
      quantity: 1,
      price: 120.53,
    },
    {
      id: 2,
      name: 'Neonoir Vanguard Boots',
      image: 'https://via.placeholder.com/150',
      color: 'Black',
      size: 'US 8',
      quantity: 1,
      price: 210.14,
    },
    {
      id: 3,
      name: 'Cybergoth Stealth Kicks',
      image: 'https://via.placeholder.com/150',
      color: 'Black',
      size: 'US 8',
      quantity: 1,
      price: 154.32,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 3;
  const total = subtotal + tax;

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
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center border-b py-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <input type="checkbox" className="mr-4" />
                  <img src={item.image} alt={item.name} className="w-16 h-16 md:w-24 md:h-24 object-cover" />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold text-lg md:text-xl">{item.name}</h2>
                  <div className="text-gray-600">
                    <p>Color: {item.color}</p>
                    <p>Size: {item.size}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">-</button>
                    <span>{item.quantity}</span>
                    <button className="text-gray-500 hover:text-gray-700">+</button>
                  </div>
                  <span className="text-lg md:text-xl font-semibold">${item.price.toFixed(2)}</span>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Icon icon="ic:baseline-close" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/3 mt-6 md:mt-0 md:ml-6 bg-gray-50 p-4 rounded-md">
            <h2 className="font-bold text-lg md:text-xl mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg md:text-xl mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;

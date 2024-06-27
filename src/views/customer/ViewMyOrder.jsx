import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/slices/orderSlice';
import notFoundImage from '../../assets/not-found.png';

const ViewMyOrder = () => {
  const dispatch = useDispatch();
  const { orders = [], status, error } = useSelector((state) => state.order); 
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchOrders(currentUser.userId));
    }
  }, [dispatch, currentUser]);

  if (status === 'loading') {
    return <p className='text-3xl text-center pt-10'>Loading orders...</p>;
  }

  if (status === 'failed') {
    return <p className='text-3xl text-center pt-10'>There is some problem with {error?.message}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">My Orders</h1>
        {orders?.length === 0 ? (
          <p className="text-center text-xl">No orders found!</p>
        ) : (
          orders?.map((order) => (
            <div key={order.orderId} className="bg-white p-6 rounded-md shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">Order ID: {order.orderId}</h2>
                  <p className="text-gray-600">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                  <p className="text-gray-600">Product: {order.productId}</p>
                  <p className="text-gray-600">Status: {order.status}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order?.products?.map((product) => (
                  <div key={product.productId} className="flex items-center border-b py-4">
                    <img src={product.image || notFoundImage} alt={product.name} className="w-16 h-16 object-cover" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-gray-600 capitalize">{product.category}</p>
                      <p className="text-gray-600">Quantity: {product.quantity}</p>
                      <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewMyOrder;

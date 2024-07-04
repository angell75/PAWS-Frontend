import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../redux/slices/orderSlice";
import Swal from "sweetalert2";
import notFoundImage from "../../assets/not-found.png";
import myPetBack from '../../assets/mypet-back.png';

const ViewMyOrder = () => {
  const dispatch = useDispatch();
  const { orders = [], status, error } = useSelector((state) => state.order);
  const currentUser = useSelector((state) => state.auth.user);
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchOrders(currentUser.userId)); // Fetch only user's orders
    }
  }, [dispatch, currentUser]);

  const handleUpdateStatus = (orderId) => {
    dispatch(updateOrderStatus({ orderId, status: 'Delivered' }))
      .unwrap()
      .then(() => {
        Swal.fire('Success', 'Order status updated to delivered!', 'success');
        dispatch(fetchOrders(currentUser.userId)); // Refresh orders
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      });
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const filteredOrders = orders.filter(order => selectedStatus === 'All' || order.status === selectedStatus);

  if (status === "loading") {
    return <p className="text-3xl text-center pt-10">Loading orders...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-3xl text-center pt-10">
        There is some problem with {error?.message}
      </p>
    );
  }

  if (!Array.isArray(orders)) {
    return <p className="text-3xl text-center pt-10">Invalid data received</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${myPetBack})` }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">My Orders</h1>
        </div>
      </section>

      {/* Filter Section */}
      <div className="bg-petBg pb-6 flex flex-wrap justify-center space-x-2 md:space-x-4 pt-6">
        {['All', 'Pending', 'Shipped', 'Delivered'].map((status) => (
          <button
            key={status}
            className={`px-2 md:px-4 py-1 md:py-2 rounded-md ${
              selectedStatus === status
                ? "bg-cyan-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-petBg container mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-xl">No orders found!</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white p-6 rounded-md shadow-md mb-6 border-2 border-black"
            >
              <div className="mb-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Order ID: {order.orderId}</h2>
                    <p className="text-gray-600">
                      Order Date: {new Date(order.orderDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-md text-center text-white ${
                    order.status === "Delivered" ? "bg-green-500" : order.status === "Shipped" ? "bg-blue-500" : "bg-yellow-500"
                  }`}
                >
                  Your order is {order.status.toLowerCase()}.
                </div>
                {order.status === "Shipped" && (
                  <div className="text-right mt-4">
                    <button
                      onClick={() => handleUpdateStatus(order.orderId)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                    >
                      Order Received
                    </button>
                  </div>
                )}
              </div>
              <div className="bg-white p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Products:</h3>
                {order.products && order.products.length > 0 ? (
                  order.products.map((product) => (
                    <div
                      key={product.productId}
                      className="flex flex-col md:flex-row justify-between items-center border-b py-4"
                    >
                      <div className="flex items-center mb-4 md:mb-0">
                        <img
                          src={product.image || notFoundImage}
                          alt={product.name}
                          className="w-32 h-32 object-cover rounded"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <p className="text-gray-600 capitalize">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">Quantity: {product.pivot.quantity}</p>
                        <p className="text-gray-600">Price: ${Number(product.pivot.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">Product details not available</p>
                )}
              </div>
              <div className="text-right mt-4">
                <h3 className="text-xl font-bold">Total: ${order.products.reduce((total, product) => total + (product.pivot.price * product.pivot.quantity), 0).toFixed(2)}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewMyOrder;

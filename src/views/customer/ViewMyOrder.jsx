import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import notFoundImage from "../../assets/not-found.png";
import myPetBack from '../../assets/mypet-back.png';

const ViewMyOrder = () => {
  const dispatch = useDispatch();
  const { orders = [], status, error } = useSelector((state) => state.order);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchOrders(currentUser.userId));
    }
  }, [dispatch, currentUser]);

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

      <div className="bg-petBg container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {orders.length === 0 ? (
          <p className="text-center text-xl">No orders found!</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white p-6 rounded-md shadow-md mb-6"
            >
              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Order ID: {order.orderId}</h2>
                    <p className="text-gray-600">
                      Order Date: {new Date(order.orderDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-md text-center text-white ${
                    order.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  Your order is {order.status.toLowerCase()}.
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Products:</h3>
                {order.products && order.products.length > 0 ? (
                  order.products.map((product) => (
                    <div
                      key={product.productId}
                      className="flex justify-between items-center border-b py-4"
                    >
                      <div className="flex items-center">
                        <img
                          src={product.image || notFoundImage}
                          alt={product.name}
                          className="w-32 h-32 object-cover"
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

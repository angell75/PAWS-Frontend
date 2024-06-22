import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';
import { fetchSellerProducts, addProduct, updateProduct, deleteProduct } from '../../redux/slices/productsSlice';
import Modal from 'react-modal';
import notFoundImage from '../../assets/not-found.png';

export default function SellerDashboard() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const user = useSelector((state) => state.user.user_info);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    image: null,
  });

  useEffect(() => {
    if (user && user.userRole === 'seller') {
      dispatch(fetchSellerProducts());
    }
  }, [dispatch, user]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setProductData({
      ...productData,
      [name]: files ? files[0] : value,
    });
  };

  const handleAddProduct = async () => {
    try {
      await dispatch(addProduct(productData)).unwrap();
      Swal.fire('Success!', 'Product added successfully.', 'success');
    } catch (error) {
      Swal.fire('Error!', 'There was an issue adding the product. Please try again.', 'error');
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await dispatch(updateProduct({ ...productData, productId })).unwrap();
      Swal.fire('Success!', 'Product updated successfully.', 'success');
    } catch (error) {
      Swal.fire('Error!', 'There was an issue updating the product. Please try again.', 'error');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      Swal.fire('Success!', 'Product deleted successfully.', 'success');
    } catch (error) {
      Swal.fire('Error!', 'There was an issue deleting the product. Please try again.', 'error');
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (status === 'loading') {
    return <p>Loading products...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <section className="bg-gray-900 text-gray-300 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-title">Seller Dashboard</h1>
          <h2 className="text-2xl text-white mt-4">Manage your products</h2>
        </div>
      </section>
      <div className="container mx-auto py-10 px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center mb-4">
          <div>
            <button onClick={openModal} className="bg-amber-600 text-white px-4 py-2 rounded-md">Add Product</button>
          </div>
          <div>
            <select className="px-4 py-2 border rounded-md">
              <option value="all">All</option>
              <option value="food">Food</option>
              <option value="treat">Treat</option>
              <option value="training-needs">Training Needs</option>
              <option value="clothes-accessories">Clothes & Accessories</option>
              <option value="supplies-others">Supplies & Others</option>
            </select>
          </div>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.productId} className="bg-white rounded-lg shadow-md p-6">
                <img src={product.image || notFoundImage} alt={product.name} className="h-32 w-full object-cover mb-4 rounded" />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p>{product.quantity} available</p>
                <p>${!isNaN(product.price) ? parseFloat(product.price).toFixed(2) : '0.00'}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <button onClick={() => handleUpdateProduct(product.productId)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    <Icon icon="mdi:pencil" />
                  </button>
                  <button onClick={() => handleDeleteProduct(product.productId)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                    <Icon icon="mdi:delete" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <img src={notFoundImage} alt="Not found" className="mx-auto mb-4" />
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Upload Pet"
        className="modal"
        overlayClassName="overlay"
        style={{
          content: {
            maxHeight: "600px",
            overflow: "auto",
            width: "60%",
            margin: "auto",
          },
        }}
      >
        <h2 className="font-mono text-3xl font-bold mb-4">Upload Pet</h2>
        <form onSubmit={handleAddProduct}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Image</label>
            <input
              type="file"
              name="image"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Category</label>
            <select
              name="category"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            >
              <option value="food">Food</option>
              <option value="treat">Treat</option>
              <option value="training-needs">Training Needs</option>
              <option value="clothes-accessories">Clothes & Accessories</option>
              <option value="supplies-others">Supplies & Others</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea
              name="description"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Price</label>
            <input
              type="number"
              name="price"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              value={productData.price}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              value={productData.quantity}
              required
              min="0"
              step="1"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-md shadow hover:bg-orange-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

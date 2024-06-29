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
    productId: '',
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    image: null,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    // Log the contents of formData
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      await dispatch(addProduct(formData)).unwrap();
      Swal.fire('Success!', 'Product added successfully.', 'success');
      closeModal();
    } catch (error) {
      Swal.fire('Error!', 'There was an issue adding the product. Please try again.', 'error');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key === 'image' && !productData[key]) {
        return; // Skip the image key if no new image is selected
      }
      formData.append(key, productData[key]);
    });

    try {
      await dispatch(updateProduct({ id: productData.productId, formData })).unwrap();
      Swal.fire('Success!', 'Product updated successfully.', 'success');
      closeModal();
      dispatch(fetchSellerProducts()); // Fetch latest products after updating
    } catch (error) {
      Swal.fire('Error!', 'There was an issue updating the product. Please try again.', 'error');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      Swal.fire('Success!', 'Product deleted successfully.', 'success');
      dispatch(fetchSellerProducts()); // Fetch latest products after deleting
    } catch (error) {
      Swal.fire('Error!', 'There was an issue deleting the product. Please try again.', 'error');
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setProductData({
        productId: product.productId,
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        image: null,
      });
    } else {
      setProductData({
        productId: '',
        name: '',
        category: '',
        description: '',
        price: '',
        quantity: '',
        image: null,
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (status === 'loading') {
    return <p>Loading products...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  

  return (
    <div className="min-h-screen flex flex-col bg-petBg">
      <section className="bg-gray-900 text-gray-300 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-title">Seller Dashboard</h1>
        </div>
      </section>

            {/* Analysis Section */}
            <div className="container mx-auto py-10 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">Total Products</h3>
            <p className="text-4xl font-bold">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">Total Customers</h3>
            <p className="text-4xl font-bold">1450</p> {/* Placeholder value */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center mb-8">
          <h3 className="text-lg font-bold">Total Orders</h3>
          <p className="text-4xl font-bold">812</p> {/* Placeholder value */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-red-500 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-bold">Order Received</h4>
              <p className="text-2xl font-bold">45</p> {/* Placeholder value */}
            </div>
            <div className="bg-orange-500 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-bold">Pending Payment</h4>
              <p className="text-2xl font-bold">10</p> {/* Placeholder value */}
            </div>
            <div className="bg-blue-500 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-bold">Shipped</h4>
              <p className="text-2xl font-bold">20</p> {/* Placeholder value */}
            </div>
            <div className="bg-emerald-500 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-bold">Completed</h4>
              <p className="text-2xl font-bold">100</p> {/* Placeholder value */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4 md:px-8 lg:px-12">
      <h2 className="text-3xl font-bold uppercase">Manage Product</h2>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-4 mt-4 sm:mt-4">
            <button onClick={() => openModal()} className="bg-cyan-600 text-white hover:bg-cyan-700 px-4 py-2 rounded-md">Add Product</button>
          </div>
          <div>
            {/* Tabs for Categories */}
            <div className="mb-6 flex flex-wrap justify-center space-x-2 md:space-x-4">
              {['all', 'food', 'treat', 'training-needs', 'clothes-accessories', 'supplies-others'].map((category) => (
                <button
                  key={category}
                  className={`px-2 md:px-4 py-1 md:py-2 rounded-md ${selectedCategory === category ? 'bg-cyan-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(product => selectedCategory === 'all' || product.category === selectedCategory).map((product) => (
              <div key={product.productId} className="bg-white rounded-lg shadow-md p-6">
                <img src={product.image || notFoundImage} alt={product.name} className="h-64 w-full object-cover mb-4 rounded" />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p>{product.quantity} available</p>
                <p>${!isNaN(product.price) ? parseFloat(product.price).toFixed(2) : '0.00'}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => openModal(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
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
            <img src={notFoundImage} alt="Not found" className="mx-auto mb-4 h-64 w-64" />
            <p className="text-gray-500 text-lg font-bold">No products currently.</p>
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
            maxHeight: '600px',
            overflow: 'auto',
            width: '60%',
            margin: 'auto',
          },
        }}
      >
        <h2 className="font-mono text-3xl font-bold mb-4">Upload Pet</h2>
        <form onSubmit={productData.productId ? handleUpdateProduct : handleAddProduct}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Image</label>
            <input
              type="file"
              name="image"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required={!productData.productId}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              value={productData.name}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Category</label>
            <select
              name="category"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              value={productData.category}
              required
            >
              <option disabled value="">Please Select</option>
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
              value={productData.description}
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

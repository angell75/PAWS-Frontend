import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice'; // Import the addToCart thunk
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import Swal from 'sweetalert2'; // Import SweetAlert2
import notFoundImage from '../../assets/not-found.png';
import myPetBack from '../../assets/mypet-back.png';

const Shopping = () => {
  const categories = ['all', 'food', 'treat', 'training-needs', 'clothes-accessories', 'supplies-others'];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
      .unwrap()
      .then(() => {
        Swal.fire('Success', 'Product added to cart', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      });
  };

  if (status === 'loading') {
    return <p>Loading products...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  const filteredProducts = selectedCategory === 'all'
    ? products.filter(product => product.quantity > 0)
    : products.filter(product => product.quantity > 0 && product.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${myPetBack})` }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Shop</h1>
        </div>
      </section>

      <div className="flex justify-between items-center mb-4 p-4">
        {/* Tabs for Categories */}
        <div className="flex flex-wrap space-x-2 md:space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-cyan-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-gray-700">Sort by:</label>
          <select id="sort" className="p-2 border border-gray-300">
            <option value="latest">Latest</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>
      <main className="w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const price = parseFloat(product.price);
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                <img src={product.image || notFoundImage} alt={product.name} className="h-64 w-full object-cover mb-4 rounded" />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-semibold">${!isNaN(price) ? price.toFixed(2) : '0.00'}</span>
                  <button 
                    onClick={() => handleAddToCart(product)} 
                    className="p-2 bg-orange-500 text-white rounded-full ml-4 flex items-center justify-center"
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Shopping;

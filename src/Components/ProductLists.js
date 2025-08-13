"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });
  const [loading, setLoading] = useState(true);

  const categories = ['Fashion', 'Electronics', 'Home', 'Sports', 'Books', 'Other'];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axios.get(`https://merchant-backend-qygg.onrender.com/api/products?${queryParams}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      subcategory: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      search: ''
    });
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="product-list-container">
      <div className="filters-section">
        <h3>Filter Products</h3>
        <div className="filters-grid">
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleFilterChange}
          />
          
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <input
            type="text"
            name="subcategory"
            placeholder="Subcategory"
            value={filters.subcategory}
            onChange={handleFilterChange}
          />
          
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
          
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
          
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      </div>

      <div className="products-section">
        <h3>Products ({products.length})</h3>
        {products.length === 0 ? (
          <p>No products found matching your criteria.</p>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.title} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="product-info">
                  <h4>{product.title}</h4>
                  <p className="product-description">{product.description}</p>
                  <div className="product-details">
                    <span className="price">₹{product.price}</span>
                    <span className="category">{product.category}</span>
                  </div>
                  <div className="product-meta">
                    <span className="subcategory">{product.subcategory}</span>
                    <span className="location">{product.location}</span>
                  </div>
                  {product.merchantId && (
                    <p className="merchant">By: {product.merchantId.name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;

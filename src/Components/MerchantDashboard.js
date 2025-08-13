"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MerchantDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    location: '',
    images: []
  });

  const categories = ['Fashion', 'Electronics', 'Home', 'Sports', 'Books', 'Other'];

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const response = await axios.get('https://merchant-backend-qygg.onrender.com/api/products/my-products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`https://merchant-backend-qygg.onrender.com/api/products/${editingProduct._id}`, formData);
      } else {
        await axios.post('https://merchant-backend-qygg.onrender.com/api/products', formData);
      }
      
      fetchMyProducts();
      resetForm();
      alert('Product saved successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product: ' + (error.response?.data?.message || error.message));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      subcategory: '',
      location: '',
      images: []
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      location: product.location,
      images: product.images || []
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://merchant-backend-qygg.onrender.com/api/products/${productId}`);
        fetchMyProducts();
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  return (
    <div className="merchant-dashboard">
      <div className="dashboard-header">
        <h2>Merchant Dashboard</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="add-product-btn"
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {/* Product Upload Form */}
      {showForm && (
        <div className="product-form-container" style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} className="product-form">
            <input
              type="text"
              placeholder="Product Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              style={{ padding: '0.75rem', margin: '0.5rem 0', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
            />
            
            <textarea
              placeholder="Product Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              style={{ 
                padding: '0.75rem', 
                margin: '0.5rem 0', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                width: '100%',
                minHeight: '100px'
              }}
            />
            
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
              min="0"
              step="0.01"
              style={{ padding: '0.75rem', margin: '0.5rem 0', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
            />
            
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
              style={{ padding: '0.75rem', margin: '0.5rem 0', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Subcategory"
              value={formData.subcategory}
              onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
              required
              style={{ padding: '0.75rem', margin: '0.5rem 0', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
            />
            
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
              style={{ padding: '0.75rem', margin: '0.5rem 0', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
            />
            
            <input
              type="url"
              placeholder="Image URL (optional)"
              value={formData.images[0] || ''}
              onChange={(e) => setFormData({
                ...formData, 
                images: e.target.value ? [e.target.value] : []
              })}
              style={{ padding: '0.75rem', margin: '0.5rem 0', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
            />
            
            <div className="form-buttons" style={{ marginTop: '1rem' }}>
              <button 
                type="submit"
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '1rem'
                }}
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button 
                type="button" 
                onClick={resetForm}
                style={{
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="products-section">
        <h3>My Products ({products.length})</h3>
        {products.length === 0 ? (
          <p>You haven't added any products yet. Click "Add New Product" to get started!</p>
        ) : (
          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {products.map(product => (
              <div key={product._id} className="product-card" style={{
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <div className="product-image" style={{
                  height: '200px',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div>No Image</div>
                  )}
                </div>
                <div className="product-info" style={{ padding: '1rem' }}>
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
                    <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>₹{product.price}</span>
                    <span style={{ background: '#3498db', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                      {product.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '1rem' }}>
                    <div>{product.subcategory}</div>
                    <div>{product.location}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => handleEdit(product)}
                      style={{
                        backgroundColor: '#f39c12',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantDashboard;

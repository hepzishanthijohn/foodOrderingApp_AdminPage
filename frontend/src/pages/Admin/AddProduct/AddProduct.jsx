import React, { useState } from 'react';
import './AddProduct.css';
import axios from 'axios';
import upload_area from '../../Assets/Admin_Assets/upload_area.svg';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('Dinner');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false); // State for loading

  // Function to handle form submission
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const data = new FormData();
    data.append('title', title);
    data.append('category', category);
    data.append('price', price);
    data.append('quantity', quantity);
    if (file) {
      data.append('image', file);
    }

    try {
      // Send request
      const response = await axios.post('https://restaurantwebsite-mernstack-1.onrender.com/api/products/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data' // This is important when sending FormData
        }
      });

      if (response.status === 200) {
        alert('Product added successfully');
      }
    } catch (error) {
      console.error('Error creating post:', error); // Handle error
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Item Name</p>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type='text'
          placeholder='Type here'
          name='title'
        />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Quantity</p>
          <input
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            type='text'
            name='quantity'
            placeholder='Type here'
          />
        </div>
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input
            value={price}
            onChange={e => setPrice(e.target.value)}
            type='text'
            name='price'
            placeholder='Type here'
          />
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Category</p>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          name='category'
          className='add-product-selector'
          style={{fontSize:"18px"}}
        >
          
          <option value='breakfast'>BreakFast</option>
<option value='dinner'>Dinner</option>
<option value='lunch'>Lunch</option>


        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img
            src={file ? URL.createObjectURL(file) : upload_area}
            alt='Upload area'
            className='addproduct-thumbnail-img'
          />
        </label>
        <input
          onChange={e => setFile(e.target.files[0])}
          type='file'
          name='image'
          id='file-input'
          hidden
        />
      </div>
      <button
        onClick={addProduct}
        className='addproduct-btn'
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Adding...' : 'ADD'} {/* Show loading text */}
      </button>
      {loading && <div className='loading-spinner'>Loading...</div>} {/* Show loading spinner */}
    </div>
  );
};

export default AddProduct;
 
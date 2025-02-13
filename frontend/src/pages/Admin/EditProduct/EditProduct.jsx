import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the product ID from the URL

const EditProduct = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        title: '',
        category: '',
        price: '',
        quantity: '',
        image: null,
        image_url: '' // This will hold the URL of the image if it's already uploaded
    });

    // Fetch product details when the component mounts
    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    // Fetch product details using the ID from the URL
    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/products/getProduct/${id}`);
            const product = response.data;
            setProductData({
                title: product.title,
                category: product.category,
                price: product.price,
                quantity: product.quantity,
                image_url: product.image_url, // The current image URL
                image: null // Clear the new image on edit
            });
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setProductData({
            ...productData,
            image: e.target.files[0] // Set the new image if uploaded
        });
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('title', productData.title);
            formData.append('category', productData.category);
            formData.append('price', productData.price);
            formData.append('quantity', productData.quantity);
            if (productData.image) {
                formData.append('image', productData.image); // Add the new image if it's uploaded
            }

            await axios.put(`http://localhost:4000/api/products/editproduct/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate('/'); // Navigate back to the product list page after saving
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="edit-product-form">
            <h2>Edit Product</h2>
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={productData.title}
                onChange={handleChange}
            />
            <label>Category</label>
            <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
            />
            <label>Price</label>
            <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
            />
            <label>Quantity</label>
            <input
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
            />
            <label>Image</label>
            <input
                type="file"
                onChange={handleImageChange}
            />
            {/* Display the current image URL if available */}
            {productData.image_url && !productData.image && (
                <div>
                    <p>Current Image:</p>
                    <img src={productData.image_url} alt="Current Product" width="100" />
                </div>
            )}
            <div>
                <button onClick={handleSave}>Save Changes</button>
                <button onClick={() => navigate('/')}>Cancel</button>
            </div>
        </div>
    );
};

export default EditProduct;

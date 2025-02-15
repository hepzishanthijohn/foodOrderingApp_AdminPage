import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import { FaEdit, FaTrashAlt, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';  // Import necessary icons
import axios from 'axios';

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // Track product being edited
    const [editedProductData, setEditedProductData] = useState({
        title: '',
        category: '',
        price: '',
        quantity: '',
        image: null
    });

    const [categoryFilter, setCategoryFilter] = useState('');  // For filtering by category
    const [sortAscending, setSortAscending] = useState(true);  // For sorting quantity in ascending/descending order

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        try {
            const response = await axios.get('https://foodorderingapp-adminpage.onrender.com/api/products/getAllProducts');
            setAllProducts(response.data); // Assuming response.data is an array of products
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const removeProduct = async (id) => {
        try {
            await axios.post('https://foodorderingapp-adminpage.onrender.com/api/products/removeproduct', { id: id }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            fetchInfo(); // Refresh the product list after removal
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    const startEdit = (product) => {
        setEditingProduct(product.id); // Set the ID of the product being edited
        setEditedProductData({
            title: product.title,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
            image: null
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedProductData({
            ...editedProductData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setEditedProductData({
            ...editedProductData,
            image: e.target.files[0]
        });
    };

    const saveEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('title', editedProductData.title);
            formData.append('category', editedProductData.category);
            formData.append('price', editedProductData.price);
            formData.append('quantity', editedProductData.quantity);
            if (editedProductData.image) {
                formData.append('image', editedProductData.image);  // Add the image if it's being updated
            }

            await axios.put(`https://foodorderingapp-adminpage.onrender.com/api/products/editproduct/${editingProduct}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setEditingProduct(null); // Close the edit form
            fetchInfo(); // Refresh the product list after saving
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleCategoryFilter = (e) => {
        setCategoryFilter(e.target.value);
    };

    const toggleSortOrder = () => {
        setSortAscending(!sortAscending);
    };

    const filterAndSortProducts = () => {
        let filteredProducts = allProducts;
        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(product => product.category.toLowerCase().includes(categoryFilter.toLowerCase()));
        }

        // Sort by quantity
        filteredProducts.sort((a, b) => sortAscending ? a.quantity - b.quantity : b.quantity - a.quantity);

        return filteredProducts;
    };

    return (
        <div className="listContainer">
            <div className="list-product"  >
                <h1 style={{marginTop:'50px'}}>All Items List</h1>

                <div className="filter-sort-container">
                    {/* Sort Button (Left End) */}
                    <div className="sort-container">
                        <button className="sort-button" onClick={toggleSortOrder}>
                            <FaSortAmountDown size={20} />
                            {sortAscending ? 'Sort by Quantity (Asc)' : 'Sort by Quantity (Desc)'}
                        </button>
                    </div>

                    {/* Filter Input (Right End) */}
                    <div className="filter-container">
                        <input
                            type="text"
                            placeholder="Filter by category"
                            value={categoryFilter}
                            onChange={handleCategoryFilter}
                        />
                        <FaFilter size={20} />
                    </div>
                </div>

                <div className="listproduct-format-main">
                    <p>Items</p>
                    <p>Item Name</p>
                    <p>Category</p>
                    <p>Quantity</p>
                    <p>Price</p>
                    <p>Actions</p>
                </div>

                <div className="listproduct-allproducts">
                    <hr />
                    {filterAndSortProducts().map((product) => (
                        <div
                            key={product.id}
                            className={`listproduct-format-main listproduct-format `}
                        >
                            <img src={product.image_url} alt="" className="listproduct-product-icon" />
                            <p>{product.title}</p>
                            <p>{product.category}</p>
                            <p>{product.quantity}</p>
                            <p>{product.price}</p>
                            <div className="listproduct-actions">
                                <FaEdit
                                    onClick={() => startEdit(product)}
                                    className="listproduct-edit-icon"
                                    size={20}
                                    title="Edit Product"
                                />
                                <FaTrashAlt
                                    onClick={() => removeProduct(product.id)}
                                    className="listproduct-remove-icon"
                                    size={20}
                                    title="Delete Product"
                                />
                            </div>

                            {/* Edit Product Form for the selected product */}
                            {editingProduct === product.id && (
                                <div className="edit-product-form">
                                    <h2>Edit Product</h2>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={editedProductData.title}
                                        onChange={handleEditChange}
                                    />
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={editedProductData.category}
                                        onChange={handleEditChange}
                                    />
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={editedProductData.price}
                                        onChange={handleEditChange}
                                    />
                                    <label>Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={editedProductData.quantity}
                                        onChange={handleEditChange}
                                    />
                                    <label>Image</label>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                    />
                                    <div>
                                        <button onClick={saveEdit}>Save Changes</button>
                                        <button onClick={() => setEditingProduct(null)}>Cancel</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default ListProduct;

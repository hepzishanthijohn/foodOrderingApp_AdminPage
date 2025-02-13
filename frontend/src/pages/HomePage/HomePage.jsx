import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { FaBox, FaShoppingCart, FaChartLine, FaCogs } from 'react-icons/fa';  // Icons for buttons
import axios from 'axios';

const HomePage = () => {
    const [productCount, setProductCount] = useState(0);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        fetchInventoryStats();
        fetchRecentProducts();
    }, []);

    const fetchInventoryStats = async () => {
        try {
            // Fetch total number of products and low-stock products
            const response = await axios.get('http://localhost:4000/api/products/stats');
            setProductCount(response.data.totalProducts);
            setLowStockCount(response.data.lowStockCount);
        } catch (error) {
            console.error('Error fetching inventory stats:', error);
        }
    };

    const fetchRecentProducts = async () => {
        try {
            // Fetch most recent products
            const response = await axios.get('http://localhost:4000/api/products/recent');
            setRecentProducts(response.data);
        } catch (error) {
            console.error('Error fetching recent products:', error);
        }
    };

    return (
        <div className="home-container">
            <div className="welcome-section">
                <h1>Welcome to Inventory Management</h1>
                <p>Manage your products, track inventory, and get insights quickly.</p>
            </div>

            <div className="stats-section">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p>{productCount}</p>
                    <FaBox size={40} />
                </div>
                <div className="stat-card">
                    <h3>Low Stock Products</h3>
                    <p>{lowStockCount}</p>
                    <FaShoppingCart size={40} />
                </div>
            </div>

            <div className="actions-section">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <button className="action-btn">
                        <FaBox size={20} />
                        View Products
                    </button>
                    <button className="action-btn">
                        <FaCogs size={20} />
                        Manage Categories
                    </button>
                    <button className="action-btn">
                        <FaChartLine size={20} />
                        View Reports
                    </button>
                </div>
            </div>

            <div className="recent-products-section">
                <h2>Recent Products</h2>
                <ul>
                    {recentProducts.map((product) => (
                        <li key={product.id}>
                            <p>{product.title} - {product.category}</p>
                            <p>Stock: {product.quantity} | Price: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;

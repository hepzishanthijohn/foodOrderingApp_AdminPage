import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FaBox, FaShoppingCart, FaDollarSign, FaChartBar } from 'react-icons/fa';  // Icons for dashboard
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [productCount, setProductCount] = useState(0);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [categoryStats, setCategoryStats] = useState([]);
    const [recentSales, setRecentSales] = useState([]);

    useEffect(() => {
        fetchDashboardStats();
        fetchRecentSales();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/dashboard/stats');
            setProductCount(response.data.totalProducts);
            setLowStockCount(response.data.lowStockCount);
            setTotalRevenue(response.data.totalRevenue);
            setCategoryStats(response.data.categoryStats);  // Expecting { category: count }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    };

    const fetchRecentSales = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/sales/recent');
            setRecentSales(response.data);
        } catch (error) {
            console.error('Error fetching recent sales:', error);
        }
    };

    // Prepare data for Bar Chart
    const categoryLabels = categoryStats.map(item => item.category);
    const categoryData = categoryStats.map(item => item.count);

    const chartData = {
        labels: categoryLabels,
        datasets: [{
            label: 'Products by Category',
            data: categoryData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            
            {/* Stats Section */}
            <div className="stats-container">
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
                <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p>${totalRevenue}</p>
                    <FaDollarSign size={40} />
                </div>
            </div>

            {/* Bar Chart for Category Breakdown */}
            <div className="chart-section">
                <h2>Product Distribution by Category</h2>
                <Bar data={chartData} options={{ responsive: true }} />
            </div>

            {/* Recent Sales */}
            <div className="recent-sales-section">
                <h2>Recent Sales</h2>
                <ul>
                    {recentSales.map((sale, index) => (
                        <li key={index}>
                            <p><strong>{sale.productName}</strong> sold for ${sale.price} on {sale.date}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;

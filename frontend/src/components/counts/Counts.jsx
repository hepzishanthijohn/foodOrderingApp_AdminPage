import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'; // Import missing elements
import axios from 'axios';
import { FaUsers, FaBoxOpen, FaClipboardList } from 'react-icons/fa';

// Register all necessary chart elements with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const DashboardStats = () => {
  const [userCount, setUserCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  // Fetch data
  useEffect(() => {
    // Replace these with your actual API calls
    axios.get('https://foodordering-clientpage-1.onrender.com/users/count')
      .then(response => setUserCount(response.data.data.count))
      .catch(error => console.error('Error fetching user count:', error));

    axios.get('https://foodorderingapp-adminpage.onrender.com/api/products/count')
      .then(response => setItemCount(response.data.data.count))
      .catch(error => console.error('Error fetching item count:', error));

    axios.get('https://yourapi.com/orders/count')
      .then(response => setOrderCount(response.data.count))
      .catch(error => console.error('Error fetching order count:', error));
  }, []);

  // Pie chart for user count
  const userChartData = {
    labels: ['Users', 'Remaining'],
    datasets: [
      {
        data: [userCount, 1000 - userCount], // Example data; replace 1000 with your max value
        backgroundColor: ['#FF4500', '#ddd'],
        
      }
    ]
  };

  // Bar chart for item count
  const itemChartData = {
    labels: ['Items'],
    datasets: [
      {
        label: 'Total Items',
        data: [itemCount],
        backgroundColor: '#4caf50',
        borderColor: '#4caf50',
        borderWidth: 1,
      }
    ]
  };

  // Line chart for order count (example)
  const orderChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders in the last 6 months',
        data: [30, 50, 70, 90, 110, 130], // Replace with real data
        fill: false,
        borderColor: '#2196F3',
        tension: 0.1,
      }
    ]
  };

  return (
    <div className="dashboard-stats-container">
      <Row>
        <Col sm={12} md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <FaUsers size={30} color="#FF4500" />
                <div className="ml-3">
                  <h4>{userCount}</h4>
                  <p>Users</p>
                </div>
              </div>
              <Pie data={userChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <FaBoxOpen size={30} color="#4caf50" />
                <div className="ml-3">
                  <h4>{itemCount}</h4>
                  <p>Items</p>
                </div>
              </div>
              <Bar data={itemChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4} style={{marginBottom:"20%"}}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <FaClipboardList size={30} color="#2196F3" />
                <div className="ml-3">
                  <h4>{orderCount}</h4>
                  <p>Orders</p>
                </div>
              </div>
              <Line data={orderChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStats;

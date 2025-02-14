import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaUsers, FaBoxOpen, FaClipboardList } from 'react-icons/fa'; // Icons

const BoxCount = () => {
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

  return (
    <div className="dashboard-stats-container" >
      <Row >
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
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <FaBoxOpen size={30} color="#4caf50"/>
                <div className="ml-3">
                  <h4>{itemCount}</h4>
                  <p>Items</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <FaClipboardList size={30} color="#2196F3" />
                <div className="ml-3">
                  <h4>{orderCount}</h4>
                  <p>Orders</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BoxCount;

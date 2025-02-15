import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Spinner, Toast, Navbar, Nav, Container, Modal } from 'react-bootstrap';
import { FaTrashAlt, FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Dashboard.css';
import Counts from '../counts/Counts';
import BoxCount from '../BoxCount/BoxCount';
import Category from '../category/Categories';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const cardContainerRef = useRef(null);

  // Fetch data
  useEffect(() => {
    axios
      .get('https://foodorderingapp-adminpage.onrender.com/api/products/getAllProducts')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

  

  

  const scrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
    <div style={{paddingTop:"2%",width:"90%",paddingLeft:"8%"}}>
    <BoxCount />
    </div>
    <div>
      <Category/>
    </div>
    <div className="dashboard-container" >
      <div className="container "style={{paddingTop:"1%"}}>
        {/* Add Product Button */}


        {/* Error / Loading */}
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <>
            {/* Horizontal Scrollable Card Section */}
            <div className="card-scroll-container">
              <Button variant="link" className="scroll-arrow" onClick={scrollLeft}>
                <FaArrowLeft />
              </Button>
              <div className="card-container" ref={cardContainerRef}>
                {products.map((product) => (
                  <div className="card-item" key={product._id}>
                    <img src={product.image_url} alt={product.title} />
                    <div className="card-title">{product.title}</div>
                    <div className="card-price">${product.price}</div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="scroll-arrow" onClick={scrollRight}>
                <FaArrowRight />
              </Button>
            </div>
          </>
        )}

        {/* Toast Notifications */}
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1050,
            
          }}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
    <div style={{marginLeft:"150px",width:"85%",marginTop:"40px",marginBottom:"90px"}}>
    <Counts/>
    </div>
    </>
  );
};

export default Dashboard;

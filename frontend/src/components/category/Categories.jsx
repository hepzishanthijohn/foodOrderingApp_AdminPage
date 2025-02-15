import React, { useState, useRef, useEffect } from 'react';
import { Button, Spinner, Toast } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Burger from '../../assets/IMAGES/BURGER.gif';
import Chicken from '../../assets/IMAGES/CHICKEN.gif';
import Beverages from '../../assets/IMAGES/BEVERAGES.gif';
import Combo from '../../assets/IMAGES/COMBO.gif';
import Desserts from '../../assets/IMAGES/DESSERTS.gif';
import IceCream from '../../assets/IMAGES/ICECREAMS.gif';
import Pasta from '../../assets/IMAGES/PASTA.gif';
import Pizza from '../../assets/IMAGES/PIZZA.gif';
import Salad from '../../assets/IMAGES/SALAD.gif';
import Soup from '../../assets/IMAGES/SOUP.gif';
import './Categories.css';

const Category = () => {
  const [categories] = useState([
    { _id: '1', name: 'Beverages', image_url: Beverages },
    { _id: '2', name: 'Desserts', image_url: Desserts },
    { _id: '3', name: 'Burgers', image_url: Burger },
    { _id: '4', name: 'Pizza', image_url: Pizza },
    { _id: '5', name: 'Pasta', image_url: Pasta },
    { _id: '6', name: 'Salads', image_url: Salad },
    { _id: '7', name: 'Chicken', image_url: Chicken },
    { _id: '8', name: 'Ice Cream', image_url: IceCream },
    { _id: '9', name: 'Soup', image_url: Soup },
    { _id: '10', name: 'Combo', image_url: Combo },
  ]);

  const [loading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const cardContainerRef = useRef(null);

  // Function to scroll right
  const scrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  // Function to scroll left
  const scrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  // Continuously scroll right and reset when the end is reached
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (cardContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = cardContainerRef.current;
        
        // If reached the end, reset scroll position to the start
        if (scrollLeft + clientWidth >= scrollWidth) {
          cardContainerRef.current.scrollLeft = 0;
        } else {
          scrollRight();
        }
      }
    }, 30); // Adjust the interval speed for continuous scrolling (in milliseconds)

    // Cleanup on component unmount
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <>
      <div className="category-container">
        <div className="container" style={{ paddingTop: '1%' }}>
          {/* Error / Loading */}
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <>
              {/* Horizontal Scrollable Category Section */}
              <div className="category-scroll-container">
                <Button variant="link" className="scroll-arrow" onClick={scrollLeft}>
                  <FaArrowLeft />
                </Button>
                <div className="category-container" ref={cardContainerRef}>
                  {categories.map((category) => (
                    <div className="category-item" key={category._id}>
                      <img src={category.image_url} alt={category.name} />
                      <div className="category-title">{category.name}</div>
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
    </>
  );
};

export default Category;

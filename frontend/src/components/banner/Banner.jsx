import React from 'react';
import './Banner.css'; // Add your styles here
import bannerImg from '../../assets/IMAGES/burger4.png'; // Your image

const Banner = () => {
  const handleClick = () => {
    // Example action on banner click (could navigate to a page, show a modal, etc.)
    console.log('Banner clicked!');
  };

  return (
    <div className="banner-item" onClick={handleClick}>
      <div className="banner-content">
        <h1 className="banner-title">Order Your Favorite Burger Now!</h1>
        <p className="banner-subtitle">Fresh & Fast Delivery to Your Doorstep</p>
        <button className="banner-button">Order Now</button>
      </div>
      <img src={bannerImg} alt="Burger Banner" className="banner-image" />
    </div>
  );
};

export default Banner;

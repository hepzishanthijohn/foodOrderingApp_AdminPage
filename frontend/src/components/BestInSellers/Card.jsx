import React from 'react';
import './Card.css';

const Card = ({ image, title, description, price }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <span className="card-price">${price}</span>
          <button className="card-button">Order Now</button>
        </div>
      </div>
    </div>
  );
};


export default Card;
import React from 'react';
import Card from './Card'; // Assuming Card.js is in the same directory
import cardData from './cardData'; // Import your cardData

const Menu = () => {
  return (
    <div className="menu">
      {/* Map through cardData and pass each item's properties as props to Card */}
      {cardData.map(item => (
        <Card 
          key={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default Menu;

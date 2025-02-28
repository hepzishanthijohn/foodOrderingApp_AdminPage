import React, { useState, useEffect } from 'react';
import './Orders.css';
import burgerImg from '../../assets/IMAGES/burgerimg.png';
import pastaImg from '../../assets/IMAGES/pasta2.png';
import pizzaImg from '../../assets/IMAGES/pizzaimg.jpg';
import saladImg from '../../assets/IMAGES/reservation.png';
import tacosImg from '../../assets/IMAGES/tacosImg.avif';
import sushiImg from '../../assets/IMAGES/sushi.jpg'
const Orders = () => {
    const [orderedItems, setOrderedItems] = useState([]);

    useEffect(() => {
        // Fetch ordered items (this could be from an API or local storage)
        const fetchOrderedItems = async () => {
            const items = [
                { id: 1, name: 'Burger', price: 5.99, quantity: 2, image: burgerImg },
                { id: 2, name: 'Pizza', price: 8.99, quantity: 1, image: pizzaImg },
                { id: 3, name: 'Pasta', price: 7.49, quantity: 1, image: pastaImg },
                { id: 4, name: 'Salad', price: 4.99, quantity: 3, image: saladImg },
                { id: 5, name: 'Sushi', price: 12.99, quantity: 1, image: sushiImg },
                { id: 6, name: 'Tacos', price: 9.99, quantity: 2, image: tacosImg },
            ];
            setOrderedItems(items);
        };

        fetchOrderedItems();
    }, []);

    const removeItem = (id) => {
        setOrderedItems(orderedItems.filter(item => item.id !== id));
    };

    const totalPrice = orderedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="orders-container">
            <h1>Ordered Items</h1>
            <div className="orders-list">
                {orderedItems.map((item) => (
                    <div key={item.id} className="order-card">
                        <img src={item.image} alt={item.name} className="order-image" />
                        <h2>{item.name}</h2>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                ))}
            </div>
            <h2>Total Price: ${totalPrice}</h2>
        </div>
    );
};

export default Orders;

import burgerImg from '../../assets/IMAGES/burgerimg.png';
import pastaImg from '../../assets/IMAGES/pasta2.png';
import pizzaImg from '../../assets/IMAGES/pizzaimg.jpg';
import saladImg from '../../assets/IMAGES/reservation.png'

const cardData = [
  {
    id: 1,
    image: burgerImg,
    title: "Classic Burger",
    description: "Juicy beef patty with fresh vegetables and special sauce",
    price: 9.99
  },
  {
    id: 2,
    image: pizzaImg,
    title: "Pepperoni Pizza",
    description: "Classic pizza with extra cheese and pepperoni",
    price: 12.99
  },
  {
    id: 3,
    image: pastaImg,
    title: "Spaghetti Bolognese",
    description: "Traditional Italian pasta with meat delicious sauce",
    price: 11.99
  },
  {
    id: 4,
    image: saladImg,
    title: "Caesar Salad",
    description: "Fresh romaine lettuce with croutons and parmesan",
    price: 8.99
  }
];

export default cardData;

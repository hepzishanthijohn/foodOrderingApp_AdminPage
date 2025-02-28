import React from 'react';
import {Routes,BrowserRouter, Route} from 'react-router-dom';
import AddProduct from './pages/Admin/AddProduct/AddProduct';
import ListProduct from './pages/Admin/ListProduct/ListProduct';
import Footer from './components/footer/Footer';
import Portal from './pages/Admin/Portal';
import EditProduct from './pages/Admin/EditProduct/EditProduct';
import './App.css'; // Import your styles
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Restaurant from './components/restaurant/Restaurant'
import HomePage from './components/home/Home';
import Orders from './components/orders/Orders';


const App = () => {
  return (
    <>
     
     <Routes>
       
     <Route path='/' element={<Portal/>}>
     {/* <Route path='/' element={<HomePage/>}/> */}
     <Route path='/' element={<HomePage/>}/>
     <Route path='restaurants' element={<Restaurant/>}/>
             <Route path='addproduct' element={<AddProduct/>}/>
             <Route path='listItem' element={<ListProduct/>}/>
             <Route path='orders' element={<Orders/>}/>
      </Route>
      </Routes>
      <Footer/>
      </>
  );
};

export default App;




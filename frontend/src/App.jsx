import React from 'react';
import {Routes,BrowserRouter, Route} from 'react-router-dom';
import AddProduct from './pages/Admin/AddProduct/AddProduct';
import ListProduct from './pages/Admin/ListProduct/ListProduct';
import Footer from './components/footer/Footer';
import Portal from './pages/Admin/Portal';
import EditProduct from './pages/Admin/EditProduct/EditProduct';
import './App.css'; // Import your styles
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './components/dashboard/Dashboard';


const App = () => {
  return (
    <>
     
     <Routes>
       
     <Route path='/' element={<Portal/>}>
     {/* <Route path='/' element={<HomePage/>}/> */}
     <Route path='/' element={<Dashboard/>}/>
             <Route path='addproduct' element={<AddProduct/>}/>
             <Route path='listItem' element={<ListProduct/>}/>
             
      </Route>
      </Routes>
      <Footer/>
      </>
  );
};

export default App;




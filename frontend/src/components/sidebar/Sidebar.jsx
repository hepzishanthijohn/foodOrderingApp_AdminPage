import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUtensils,FaBox,FaList ,FaUsers, FaChartBar,FaConciergeBell } from 'react-icons/fa';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './Sidebar.css'; // Import the CSS for the sidebar
import Navbar from '../../pages/Admin/AdminNavbar/AdminNavbar';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
     <div className='position-fixed w-100' style={{marginTop:"0px",marginBottom:"3rem",zIndex:"999"}}>
            <Navbar></Navbar>
        </div>
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <p>Flavour Fusion</p>
      </div>

      <div className="menu-bar">
        <Link to="/" className="menu-item">
          <FaHome style={{fontSize:"25px"}}/>
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <Link to="/orders" className="menu-item">
          <FaUtensils style={{fontSize:"25px"}}/>
          {!collapsed && <span>Orders</span>}
        </Link>
        <Link to="/addproduct" className="menu-item">
          <FaBox  style={{fontSize:"25px"}}/>
          {!collapsed && <span>Add Items</span>}
        </Link><Link to="/listItem" className="menu-item">
          <FaList  style={{fontSize:"25px"}}/>
          {!collapsed && <span>List Items</span>}
        </Link>

        <Link to="/restaurants" className="menu-item">
          <FaConciergeBell  style={{fontSize:"25px"}}/>
          {!collapsed && <span>Restaurants</span>}
        </Link>

        <Link to="/users" className="menu-item">
          <FaUsers style={{fontSize:"25px"}}/>
          {!collapsed && <span>Users</span>}
        </Link>

        <Link to="/analytics" className="menu-item">
          <FaChartBar style={{fontSize:"25px"}} />
          {!collapsed && <span>Analytics</span>}
        </Link>
      </div>

      {/* Toggle Button */}
      <div className="toggle" onClick={toggleSidebar}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </div>
    </>
  );
};

export default Sidebar;

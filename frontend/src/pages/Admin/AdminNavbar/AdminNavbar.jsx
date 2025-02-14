import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import { FaUserCircle, FaSearch, FaBell } from "react-icons/fa";
import { Navbar as BootstrapNavbar, Nav, Dropdown, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../Assets/Admin_Assets/logo3.jpg'; // Update with actual path to your admin logo

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [search, setSearch] = useState('');
  const menuRef = useRef();
  const navigate = useNavigate();
  
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  const handleLogout = () => {
    // handle logout logic (clear session, token, etc.)
    navigate('/login'); // redirect to login page after logging out
  }

  return (
    <div>
      <BootstrapNavbar className="navbar_items" style={{ backgroundColor: "#f83104", top: "0", width: "100%", position: "fixed", zIndex: "999" }} expand="lg">
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-flex justify-content-end w-100 align-items-center">
            {/* Search Bar */}
            <FormControl
              type="text"
              placeholder="Search..."
              className="search-bar"
              value={search}
              onChange={handleSearchChange}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                borderRadius: "20px",
                padding: "5px 15px",
                marginRight: "20px",
                color: "#333",
                width: "200px"
              }}
            />
            
            {/* User Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic" style={{ color: "white", fontSize: "19px" }}>
                <span style={{ color: "white", fontSize: "19px" }}>
                  <span style={{ fontSize: "20px" }}>Admin</span>
                </span>
                <span className='ml-3 mr-2'><FaUserCircle style={{color: "white", fontSize: "50px"}} /></span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/portal/profile" style={{ color: "white", fontSize: "19px" }}>Profile</Dropdown.Item>
                <Dropdown.Item as={Link} to="/portal/settings" style={{ color: "white", fontSize: "19px" }}>Settings</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} style={{ color: "white", fontSize: "19px" }}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Notifications Icon */}
            <div className="admin-nav-icons">
              <Link to="/portal/notifications">
                <FaBell style={{ color: "white", fontSize: "25px", marginLeft: "20px" }} />
              </Link>
            </div>
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>

      {/* Add margin to the content below the navbar */}
      <div style={{ marginTop: "100px" }}>
        {/* Your page content goes here */}
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';

const Header = ({ username }) => {
  return (
    <header>
      <div className="logo">
        <h1>FlavourFusion</h1>
      </div>
      <div className="user-profile">
        <img src="profile.jpg" alt="Profile" className="profile-pic" />
        <span>{username}</span>
      </div>
    </header>
  );
};

export default Header;

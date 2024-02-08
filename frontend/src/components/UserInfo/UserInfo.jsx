import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import './UserInfo.css'; // Update the path to your CSS file as necessary

const UserInfo = ({ userName, userEmail, userPicture }) => {
  return (
    <header id="header">
      <div className="d-flex flex-column">
        <div className="profile">
          <img src={userPicture} alt="" className="img-fluid rounded-circle"></img>
          <h1 className="text-light hello-text">Hello {userName}</h1>
        </div>
        <nav id="navbar" className="nav-menu navbar">
          <ul>
            <li></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default UserInfo;

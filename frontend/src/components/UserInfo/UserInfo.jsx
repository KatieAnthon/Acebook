import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import './UserInfo.css'; // Update the path to your CSS file as necessary

const UserInfo = ({ userName, userEmail, userPicture }) => {
  return (
    <header id="header">
      <div className="d-flex flex-column">
        <div className="profile">
          <img src={userPicture} alt="" className="img-fluid rounded-circle"></img>
          <h1 className="text-light">Hello {userName}</h1>
        </div>
        <nav id="navbar" className="nav-menu navbar">
          <ul>
            <li><Link to="#hero" className="nav-link scrollto active"><i className="bx bx-home"></i> <span>Home</span></Link></li>
            <li><Link to="#about" className="nav-link scrollto"><i className="bx bx-user"></i> <span>About</span></Link></li>
            <li><Link to="#Saved" className="nav-link scrollto"><i className="bi bi-graph-up"></i> <span>Saved</span></Link></li>
            <li><Link to="#Friends" className="nav-link scrollto"><i className="bx bx-file-blank"></i> <span>Friends</span></Link></li>
            <li><Link to="#Groups" className="nav-link scrollto"><i className="bx bx-book-content"></i> <span>Groups</span></Link></li>
            <li><Link to="#Video" className="nav-link scrollto"><i className="bx bx-envelope"></i> <span>Videos</span></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default UserInfo;

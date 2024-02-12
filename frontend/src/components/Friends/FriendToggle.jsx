import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import { getFriendInfo } from '../../services/authentication';
import "./FriendToggle.css"



const FriendToggle = ({friend, picture}) => {


  return (
   
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div className="friend-toggle-container"></div>
      <h6>{friend}</h6>
        <img
          src={picture} // Assuming each picture object has a 'url' property
          alt={`Picture ${friend}`} // Provide a meaningful alt text
          className="thumbnail-img" // Adjust styling as needed
        />
       
    </div>
  );
};



export default FriendToggle;
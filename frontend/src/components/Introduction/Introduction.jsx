import React from "react";
import './Introduction.css'; 

const Introduction = (props) => {
    return (
      <div className="introduction-container">
        <h1>Welcome to your {props.pageName}</h1>
      </div>
    );
  };
  
  export default Introduction;
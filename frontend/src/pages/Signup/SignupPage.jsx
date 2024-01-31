import { useNavigate, Link } from "react-router-dom";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { signup } from "../../services/authentication"; // Ensure you have a signup function

import './SingupPage.css';


const isValidEmail = (email) => {
  return email.includes('@');
};

const isValidPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasNumber &&
    hasSpecialChar
  );
};

export const SignupPage = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [profilePic, setProfilePic] = useState(null); // State for the profile picture
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

     // Validate email
    if (!isValidEmail(email)) {
      errors.email = 'Email must contain an @ symbol.';
    }

    // Validate password
    if (!isValidPassword(password)) {
      errors.password =
        'Password must be at least 8 characters long with 1 uppercase, 1 number, and 1 special character.';
    }

     // Check for any validation errors
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Stop submission if there are errors
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);

    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {

      await signup(formData); // Adjusted to handle FormData

      navigate("/login");
    } catch (err) {
      console.error("Error during signup:", err);
      // Handle error
      setFormErrors({ submission: 'Failed to submit form. Please try again.' });
      navigate("/signup");
    }
  };
  

  const handleEmailChange = (event) => {
    const newValue = event.target.value;
    setEmail(newValue);
    setFormErrors({ ...formErrors, email: '' }); // this clears the erros messsage once the user starts typing
  }

  const handlePasswordChange = (event) => {
    const newValue = event.target.value;
    setPassword(newValue);
    setFormErrors({ ...formErrors, password: '' }); // this clears the erros messsage once the user starts typing
  }

  const handleProfilePicChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfilePic(selectedFile);
    // console.log("Profile picture selected:", selectedFile.name); // Log the profile picture name
  }

  const handleUsernameChange = (event) => {
    const newValue = event.target.value;
    setUsername(newValue); 
  };


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h2 className="mb-3 text-center">Signup</h2>
          {formErrors.submission && <div className="alert alert-danger">{formErrors.submission}</div>}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <input id="email" type="email" placeholder="Email Address" className="form-control" value={email} onChange={handleEmailChange} />
              {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
            </div>

            <div className="mb-3">
              <input id="password" type="password" placeholder="Password" className="form-control" value={password} onChange={handlePasswordChange} />
              {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
            </div>

            <div className="mb-3">
              <input id="username" type="text" placeholder="Username" className="form-control" value={username} onChange={handleUsernameChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="profilePic" className="form-label">Profile Picture:</label>
              <input id="profilePic" name="profilePic" type="file" className="form-control" onChange={handleProfilePicChange} />
            </div>

            <div className="d-grid gap-2">
              <input role="submit-button" id="submit" type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
          <div className="d-grid gap-2">
            <Link to="/login" className="btn btn-primary">Log In</Link>      
          </div>
        </div>
      </div>
    </div>
    
  );
};
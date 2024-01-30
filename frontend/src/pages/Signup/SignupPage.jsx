import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication"; // Ensure you have a signup function

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
  // const [username, setUsername] = useState("");

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

    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {

      await signup(email, password, username);
      console.log("redirecting...:");

      await signup(formData); // Adjusted to handle FormData

      navigate("/login");
    } catch (err) {
      console.error("Error during signup:", err);
      // Handle error
      setFormErrors({ submission: 'Failed to submit form. Please try again.' });

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

  // const handleUsernameChange = (event) => {
  // setUsername(event.target.value); 
  // };

  return (
    <>
      <h2>Signup</h2>
      {formErrors.submission && <div className="error">{formErrors.submission}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="email">Email:</label>
        <input id="email" type="text" value={email} onChange={handleEmailChange} />
        {formErrors.email && <div className="error">{formErrors.email}</div>} {/* Display email error */}
        
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" value={password} onChange={handlePasswordChange} />
        {formErrors.password && <div className="error">{formErrors.password}</div>} {/* Display password error */}

        {/* <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        /> */}

        <label htmlFor="profilePic">Profile Picture:</label>
        <input id="profilePic" name="profilePic" type="file" onChange={handleProfilePicChange} />

        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};

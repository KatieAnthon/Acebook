import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authentication";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './LoginPage.css';



export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      window.localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      navigate("/login");
      alert("Wrong details try again")
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row">
      <div className="col-md-12"> 
          <h2 className="mb-3 text-center">Please log IN</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                id="email"
                type="email"
                placeholder="Email Address" 
                className="form-control"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-3">
              <input
                id="password"
                type="password"
                placeholder="Password" 
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="d-grid gap-2">
              <button 
                role="submit-button"
                id="submit"
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="d-grid gap-2">
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>      
          </div>
        </div>
      </div>
    </div>
  );
}
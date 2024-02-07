import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserInfo } from "../../services/authentication";
import { getMessagesByUser } from '../../services/message';
import { useNavigate } from "react-router-dom";

export const MyMessages = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState(null);
    const [messages, setUserMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        if (token) {
          try {
            const userInfoData = await getUserInfo(token);
            setUserInfo(userInfoData);
            const userMessages = await getMessagesByUser(token);
            setUserMessages(userMessages || []);
          } catch (err) {
            console.error('Error fetching user information:', err);
          }
        } else {
          console.log('No token found, navigating to login.');
          navigate("/login");
        }
      };
    
      fetchData();
    }, [token, navigate]);

    return (
        <>
          <nav className="navbar navbar-expand-md navbar-dark" style={{backgroundColor: '#3097D1'}}>
            <button className="nav-link" onClick={openModal}>Messages</button>
          </nav>
          <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="modalview" style={{display: isModalOpen ? 'block' : 'none'}}>
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title h4">Messages</div>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul className="list-unstyled">
                    {messages.map((message, index) => (
                      <li key={index} className="media hover-media">
                        {/* Image placeholder or message content here */}
                        <div className="media-body text-dark">
                          {/* Assuming `message` object has relevant properties */}
                          <h6 className="media-header">From: {message.senderUsername}</h6>
                          <p className="media-text">{message.message}</p>
                        </div>
                        <hr className="my-3"></hr>
                      </li>    
                    ))}
                  </ul>           
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

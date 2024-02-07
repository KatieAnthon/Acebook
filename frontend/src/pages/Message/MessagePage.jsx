import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserInfo } from "../../services/authentication";
import { getMessagesByUser } from '../../services/message';
import { useNavigate } from "react-router-dom";
import './Message.css'; 
import Modal from 'react-bootstrap/Modal';


export const MyMessages = ({isModalOpen, closeModal}) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [messages, setUserMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        if (token) {
          try {
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
            <Modal show={isModalOpen} onHide={closeModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Messages</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ul className="list-unstyled">
                    {messages.map((message, messageIndex) => (
                      <React.Fragment key={messageIndex}>
                        <li className="media hover-media">
                        <img src={message.userPicute ? `http://localhost:3000/${message.userPicute}` : 'default-picture-url'} alt="msg" width="60px" height="60px" className="rounded-circle mr-3"></img>
                          <div className="media-body text-dark">
                            <h6 className="media-header">From: {message.senderUsername}</h6>
                            <p className="media-text">{message.message}</p>
                          </div>
                        </li>
                        <hr className="my-3" />
                      </React.Fragment>    
                    ))}
                 </ul>
              </Modal.Body>
            </Modal>
    );
};

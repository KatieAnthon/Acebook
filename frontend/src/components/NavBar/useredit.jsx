import { useState, useEffect } from 'react';
import { friendRequestResponse, getFriendRequests } from "../../services/users";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css'

const EditProfile = () => {
    return (
      <button>edit profile</button>
  );
};
const DeleteProfile = () => {
    return (
      <button>Delete profile</button>
  );
};

const Settings = () => {
  const [token] = useState(window.localStorage.getItem("token"));
  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const friendRequestData = await getFriendRequests(token);
          const unconfirmedFriendRequests = friendRequestData.friend_list.filter(friend => !friend.confirmed);       
          setFriendRequests(unconfirmedFriendRequests);    
        } catch (err) {
          console.error('Error fetching user information:', err);
        }
      }
    };
    fetchData();
  }, [token]); // Corrected dependency array
console.log('here',friendRequests)
  return (
    <div className="requests" role="requests">
      <NavDropdown title="Profile settings">
          
        <EditProfile />
          <Nav.Link href="/"
                    onClick = {()=> {console.log(
                        'logging out');
                        localStorage.clear();
                        }}
                        style={{
                            border: '1px solid #000',
                            padding: '5px',
                            borderRadius: '5px',
                            backgroundColor: '#4267b2'
                          }}
                        >
                    Logout
        </Nav.Link>
        <DeleteProfile/>
    </NavDropdown>
    </div>
  );
};

export default Settings;

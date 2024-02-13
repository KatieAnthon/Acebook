import { useState, useEffect } from 'react';
import { friendRequestResponse, getFriendRequests } from "../../services/users";
import NavDropdown from 'react-bootstrap/NavDropdown';


const FriendRequest = ({ friend, handleAcceptRequest }) => {
  // Component logic for rendering each friend request
    return (
    <div key={friend._id}>
      <p>{friend.username} sent you a friend request</p>
      <button onClick={() => handleAcceptRequest(friend)}>Accept</button>
    </div>
  );
};

const FriendRequestList = () => {
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


  const handleAcceptRequest = async (friend) => {
    try {
      // sends the token, user_id of who the friend request is from, and confirmation of request
      await friendRequestResponse(token, friend._id, true);
      const updatedRequestData = await getFriendRequests(token);

      const unconfirmedFriendRequests = updatedRequestData.friend_list.filter(friend => !friend.confirmed);
      setFriendRequests(unconfirmedFriendRequests);
    } catch (err) {
      console.error('Error accepting request', err.message);
    }
  };
  return (
    <div className="requests" role="requests">
      <NavDropdown title="Friend Requests">
        {friendRequests && friendRequests.length > 0 ? (
          <>
            <h3>Friend Requests</h3>
              {friendRequests.map((friend) => (
                <FriendRequest 
                  key={friend._id} 
                  friend={friend}
                  handleAcceptRequest={handleAcceptRequest} 
                />
              ))}
          </>
        ) : (
      <p>No friend requests</p>
    )}
    </NavDropdown>
    </div>
  );
};

export default FriendRequestList;

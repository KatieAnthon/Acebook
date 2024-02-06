import { useState, useEffect } from 'react';
import { friendRequestResponse, getFriendRequests } from "../services/users";

const FriendRequest = ({ friend, handleAcceptRequest }) => {
  // Component logic for rendering each friend request
  return (
    <div key={friend._id}>
      <p>{friend._id} send you a friend request</p>
      <button onClick={() => handleAcceptRequest(friend)}>Add Friend</button>
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
          setFriendRequests(friendRequestData.friend_list);
          console.log("friendrequestdata", friendRequestData);
        } catch (err) {
          console.error('Error fetching user information:', err);
        }
      }
    };

    fetchData();
  }, [token]); // Corrected dependency array

  const handleAcceptRequest = async (friend) => {
    try {
      console.log(friend._id)
      // sends the token, user_id of who the friend request is from, and confirmation of request
      await friendRequestResponse(token, friend._id, true);
      const updatedRequestData = await getFriendRequests(token);
      console.log("updated data", updatedRequestData);
      setFriendRequests(updatedRequestData.friend_list);
    } catch (err) {
      console.error('Error accepting request', err.message);
    }
  };

  return (
    <div className="requests" role="requests">
      {friendRequests && (friendRequests.filter(friend => !friend.confirmed)).length > 0 ? (
        <>
          <h3>Friend Requests</h3>
          {friendRequests
          .map((friend) => (
            <FriendRequest key={friend._id} 
                            friend={friend} 
                            handleAcceptRequest={handleAcceptRequest} />
          ))}
        </>
      ) : (
        <p>No friend requests</p>
      )}
    </div>
  );
};

export default FriendRequestList;

import { useState, useEffect } from 'react';
import { friendRequestResponse } from "../services/users";
import { getFriendRequests } from "../services/users"
// takes user_id of who's logged in to fetch friend requests 
// return list of friend requests to respond to
// respond to friend requests

const FriendRequest = () => {
    const [token] = useState(window.localStorage.getItem("token"));
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {

                
                    
                const friendRequestData = await getFriendRequests(token);

                setFriendRequests(friendRequestData.friend_list);
                console.log("friend list", friendRequests)
                
                } catch (err) {
                console.error('Error fetching user information:', err);
                }
            }
        }
        fetchData()
    }, [token]);

    const handleAcceptRequest = async (friend) => {
        try {
            // sends the token, user_id of who the friend request is from, and confirmation of request
            await friendRequestResponse(token, friend.id, true);
            const updatedRequestData =await getFriendRequests(token);
            console.log("updated data",updatedRequestData)
            setFriendRequests(updatedRequestData.friend_list);
        } catch (err) {
            console.error('Error accepting request', err.message);
        }
    };

    return (
        <div className="requests" role="requests">
        {friendRequests && friendRequests.friend_list ? (
          <>
            <h3>Friend Requests</h3>
            {friendRequests.map((friend) => (
              <div key={friend.userid}>
                <p>{friend.userid}</p>
                <button onClick={() => handleAcceptRequest(friend)}>Add Friend</button>
              </div>
            ))}
          </>
        ) : (
          <p>No friend requests</p>
        )}
      </div>
    );

}


export default FriendRequest;
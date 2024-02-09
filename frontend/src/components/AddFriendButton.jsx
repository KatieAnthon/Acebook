// find user_id from user profile
// find user_id from token

import { sendFriendRequest, checkIdInFriendList } from "../services/users"
import { useState, useEffect } from "react";

// needs to take user_id as props from the profile you're visiting!
const AddFriendButton = (props) => {
    const [token] = useState(window.localStorage.getItem("token"));
    const [requestStatus, setRequestStatus] = useState('Add Friend 😁')
    const [showButton, setShowButton] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            if (token, props.user_id) {
                try {
                    const friendRequestData = await checkIdInFriendList(token, props.user_id);
                    if(friendRequestData.message === "Show add friend button"){
                        setShowButton(true);
                    }
                } 
                catch (err) {
                    console.error('Error fetching user information:', err);
                }
            }
        };
    
        fetchData();
      }, [token, props.user_id]); // Corrected dependency array
    
    

    const handleSendFriendRequest = async () => {
        try {
            // sending user_id of who's logged in AND user_id of the profile you're visiting
            console.log(props.user_id)
            await sendFriendRequest(token, props.user_id);
            // update the state of request status
            setRequestStatus('Friend Request Sent');
        } catch (err) {
            console.error("Error handling friend request:", err.message);
        }
    };
    return (
        <>
        {showButton && (
            <div>
                <button onClick={handleSendFriendRequest}>{requestStatus}
                </button>
            </div>
        )}
        </> 
    )
}

export default AddFriendButton;
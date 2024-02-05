// find user_id from user profile
// find user_id from token

import { sendFriendRequest } from "../services/users"
import { useState } from "react";

// needs to take user_id as props from the profile you're visiting!
const AddFriendButton = (props) => {
    const [token] = useState(window.localStorage.getItem("token"));
    const [requestStatus, setRequestStatus] = useState('')

    const handleSendFriendRequest = async () => {
        try {
            // sending user_id of who's logged in AND user_id of the profile you're visiting
            await sendFriendRequest(token, { user_id: props.user_id });
            // update the state of request status
            setRequestStatus('Friend Request Sent');
        } catch (err) {
            console.error("Error handling like", err.message);
        }
    };

    return (
    <div>
        <button onClick={handleSendFriendRequest} >😁 Add Friend {requestStatus}
        </button>
    </div>
    )
}

export default AddFriendButton;
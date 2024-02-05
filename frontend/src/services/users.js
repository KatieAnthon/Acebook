// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const sendFriendRequest = async (token, user_id) => {
    const requestOptions = {
    method: "POST",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(user_id),
};

const response = await fetch(`${BACKEND_URL}/users/sendFriendRequest`, requestOptions);
if (response.status !== 200) {
    throw new Error("Unable to send friend request");
}

const data = await response.json();
console.log("data", data)
return data;
};


export const friendRequestResponse = async (token, user_id, confirmed) => {
    const requestOptions = {
    method: "POST",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(user_id, confirmed),
};

const response = await fetch(`${BACKEND_URL}/users/friendRequestResponse`, requestOptions);
if (response.status !== 200) {
    throw new Error("Unable to respond to friend request");
}

const data = await response.json();
console.log("data", data)
return data;
};

export const getFriendRequestResponse = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/friendRequestResponse`, requestOptions);

    if (!response.ok) {
        throw new Error(`Error fetching user information: ${response.statusText}`);
    }

    return await response.json();
};
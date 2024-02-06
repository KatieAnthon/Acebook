// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password) => {
  const payload = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/tokens`, requestOptions);

  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    let data = await response.json();
    return data.token;
  } else {
    throw new Error(
      `Received status ${response.status} when logging in. Expected 201`
    );
  }
};

// needed to change this. as when we are dealing with file uploads in a form, we can't use JSON as the content type. Instead, we need to use FormData
export const signup = async (formData) => {
  const requestOptions = {
    method: "POST",
    body: formData,   
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status === 201) {
    return;
  } else {
    throw new Error(
      `Received status ${response.status} when signing up. Expected 201`
    );
  }
};


export const getUserInfo = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users/userinfo`, requestOptions);

  if (!response.ok) {
    throw new Error(`Error fetching user information: ${response.statusText}`);
  }
  const userInfo = await response.json();

  // Add user ID to the userInfo object
  userInfo.userId = userInfo._id;

  return userInfo;
};

export const getFriendInfo = async (token, username) => {
  console.log("services")
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/${username}`, requestOptions);
  
  
  if (!response.ok) {
    throw new Error(`Error fetching user information: ${response.statusText}`);
  }

  return await response.json();
};



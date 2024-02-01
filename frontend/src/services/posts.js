// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (token) => {

  console.log("token" + token)

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

export const createPost = async (token, postData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
};


export const getSinglePost = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/userPost`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

export const getUserLikes = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/getUserLikes`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

export const addUserLike = async (post_id, token) => {

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `application/json`,
    },
    body: JSON.stringify({ post_id }),
  };

  const response = await fetch(`${BACKEND_URL}/posts/addUserLike`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to like posts");
  }

  const data = await response.json();
  return data;
};


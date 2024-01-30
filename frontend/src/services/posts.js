// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (token) => {
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


// creating post requests for posts

export const postPosts = async (postData, token) => {
  const requestOptions = {
    method: "POST",
    body: postData, 
    headers: {
      'Authorization': `Bearer ${token}`,
    },  
  };

  let response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status === 201) {
    return;
  } else {
    throw new Error(
      `Received status ${response.status} when adding posts. Expected 201`
    );
  }
};

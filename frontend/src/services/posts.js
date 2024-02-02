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

export const createPost = async (token, formData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,  
    
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

export const addUserLike = async (token, post_id) => {
  const requestOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post_id),
  };

  const response = await fetch(`${BACKEND_URL}/posts/likes`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to like posts");
  }

  const data = await response.json();
  console.log("data", data)
  return data;
};

export const deletePost = async (token, postId) => {
  console.log("Deleting post with ID:", postId); // Log the postId

  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${BACKEND_URL}/posts/posts/${postId}`;
  console.log("Request URL:", url); // Log the request URL

  const response = await fetch(url, requestOptions);

  console.log("Response status:", response.status); // Log the response status

  if (!response.ok) {
    throw new Error(`Error in deleting post: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Assuming your original updatePost function
export const updatePost = async (token, postId, formData) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };
  const url = `${BACKEND_URL}/posts/editingPost/${postId}`;
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Error in updating post: ${response.statusText}`);
    }
    const responseData = await response.json();
    // Check if 'updatedPost' is present in the response
    const updatedPost = responseData.updatedPost || null;
    return { message: responseData.message, updatedPost };
  } catch (error) {
    console.error('Error updating post:', error.message);
    throw error;
  }
};



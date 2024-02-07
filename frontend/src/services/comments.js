// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const addCommentToPost = async (token, postId, commentText) => {
  console.log(postId, commentText)
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId, comment: commentText }),
  };

  // Adjust the URL to point to the correct endpoint for adding comments
  const response = await fetch(`${BACKEND_URL}/comments/commentPost`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to add comment');
  }

  return response.json();
  
};

  export const getAllComments = async (token) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await fetch(`${BACKEND_URL}/comments/comments`, requestOptions);
  
    if (response.status !== 200) {
      throw new Error("Unable to fetch posts");
    }
  
    const data = await response.json();
    return data;
  };
  
  export const getCommentsByPostId = async (token, postId) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${BACKEND_URL}/comments/byPost/${postId}`, requestOptions);
  
    if (!response.ok) {
      throw new Error("Unable to fetch comments");
    }
  
    const data = await response.json();
    return data.comments; // Assuming the backend sends the comments in a 'comments' key
  };

export const addLikeComment = async (token, comment_id) => {
  const requestOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(comment_id),
  };

  const response = await fetch(`${BACKEND_URL}/comments/likes`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to like comment");
  }

  const data = await response.json();
  // console.log("data", data)
  return data;
};

export const deleteComment = async (token, commentId) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${BACKEND_URL}/comments/comments/${commentId}`;

  try {
    const response = await fetch(url, requestOptions);
    console.log('Delete comment response:', response);

    if (!response.ok) {
      throw new Error(`Error in deleting comment: ${response.statusText}`);
    }

    // Check if the response contains JSON data
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Deleted comment data:', data);
      return data;
    } else {
      // Handle the case where the response doesn't contain JSON data
      console.log('Deleted comment successfully');
      return null;
    }
  } catch (error) {
    console.error('Error in deleteComment:', error);
    throw error; // Make sure to re-throw the error if it occurs.
  }
};

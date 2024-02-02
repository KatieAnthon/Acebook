// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const addCommentToPost = async (token, postId, commentText) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Specify that you are sending JSON data
    },
    body: JSON.stringify({ comment: commentText }), // Send the comment text in JSON format
  };
  
  const response = await fetch(`${BACKEND_URL}/posts/commentPost/${postId}`, requestOptions);
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
  
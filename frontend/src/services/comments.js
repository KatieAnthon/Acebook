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
  
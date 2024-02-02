// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



export const addCommentToPost = async (token, postId, formData) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,  
      
    };
    const response = await fetch(`${BACKEND_URL}/comments/commentPost/${postId}`, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
  
    return response.json();
};
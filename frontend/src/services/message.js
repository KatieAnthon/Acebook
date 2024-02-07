const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const getMessagesByUser = async (token) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${BACKEND_URL}/messages/usermessage`, requestOptions);
  
    if (!response.ok) {
      throw new Error("Unable to fetch comments");
    }
  
    const data = await response.json();
    return data; // Assuming the backend sends the comments in a 'comments' key
  };
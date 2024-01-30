import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts} from "../../services/posts";
import { createPost } from '../../services/posts'; 
import Post from "../../components/Post/Post";
import PostForm from "../../components/Post/PostForm";


export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.err(err);
        });
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const handlePostSubmit = async (newPostContent) => {
    try {
      await createPost(token, { message: newPostContent });
      
      const updatedPosts = await getPosts(token);
      setPosts(updatedPosts.posts);
    } catch (err) {
      console.error('Error creating post:', err.message);
    }
  };

  return (
    <>
      <h2>New Post</h2>
      <PostForm onSubmit={handlePostSubmit} />
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

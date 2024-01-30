import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts} from "../../services/posts";
import Post from "../../components/Post/Post";
import PostForm from "../../components/Post/PostForm";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [post, setPost] = useState("")
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

  const handlePostSubmit = (newPost) => {
    setPosts ((prevPosts) => [
      {content: newPost, _id: Date.now(), user: "current_user_id"},
      prevPosts,
    ])
  }

  const handleSubmit = (event) => {
    setPosts.push(e.target.post)
    console.log("submission works")
  }

  return (
    <>
      <h2>New Post</h2>
      <PostForm onSubmit={handlePostSubmit} />
      <h2>Posts</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Create Post:
          <input
          type="post"
          name="post"
          value={post}
          onChange={(e) => setPost(e.target.post)}
          />
        </label>
        <label>
            Submit
            <input type="submit" />
            </label>
      </form>

      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

export default FeedPage;

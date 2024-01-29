import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts} from "../../services/posts";
import Post from "../../components/Post/Post";

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
  });

  if (!token) {
    return;
  }

  const handleSubmit = (event) => {
    setPosts.push(e.target.post)
    console.log("submission works")
  }

  return (
    <>
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

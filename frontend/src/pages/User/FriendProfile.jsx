import { useState, useEffect,  } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";


// import { getFriendPost } from "../../services/posts"
import { getSinglePost} from "../../services/posts";
import { createPost } from '../../services/posts'; 
import Post from "../../components/Post/Post";
import NavBar from "../../components/NavBar"
import UserInfo from "../../components/UserInfo"
import { getFriendInfo } from "../../services/authentication"


import "../../components/Post/Post.css";
import UserProfile from "./UserProfile";


export const FriendProfile = () => {
const [posts, setPosts] = useState([]);
const [token, setToken] = useState(window.localStorage.getItem("token"));
const [FriendInfo, setFriendInfo] = useState(null);
const { username } = useParams();

console.log("username", username)



const navigate = useNavigate();




  useEffect(() => {
    const fetchData = async () => {
      if (token && username) {
        try {       
          const FriendInfoData = await getFriendInfo(token, username);
          setFriendInfo(FriendInfoData);

        } catch (err) {
          console.error('Error fetching user information:', err);
        }
  
        try {
          
          const postsData = await getSinglePost(token);
          setPosts(postsData.posts);
        } catch (err) {
          console.error('Error fetching posts:', err);
        }
      } else {
        console.log('No token found, navigating to login.');
        navigate("/login");
      }
    };
  
    fetchData();
  }, [token, username]);

  return (
    <>
      <NavBar />
      <h2> {}'s Profile </h2>
      {posts.map((post) => (
      <Post key={post._id} post={post} />
      ))}
    </>
  );
};

export default FriendProfile;
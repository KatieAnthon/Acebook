import { useState, useEffect,  } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";


// import { getFriendPost } from "../../services/posts"
import { getSinglePost} from "../../services/posts";
import { createPost } from '../../services/posts'; 
import Post from "../../components/Post/Post";
import NavBar from "../../components/NavBar"
import UserInfo from "../../components/UserInfo"
import { getFriendInfo } from "../../services/authentication"



import "../../components/Post/Post.css"


export const FriendProfile = () => {
const [posts, setPosts] = useState([]);
const [token, setToken] = useState(window.localStorage.getItem("token"));
const [FriendInfo, setFriendInfo] = useState([]);
const { username } = useParams();

const navigate = useNavigate();




  useEffect(() => {
    const fetchData = async () => {
      if (token && username) {
        try {       
          const FriendInfoData = await getFriendInfo(token, username);  
          setFriendInfo(FriendInfoData);

          const PostsData = FriendInfoData.posts
          setPosts(PostsData)

        } catch (err) {
          console.error('Error fetching user information:', err);
        }
  
       }
    };
  
    fetchData();
  }, [token, username]);

  return (
    <>
      <NavBar />
      <h2> {username}'s Profile </h2>
      <p>
      <img 
      src={`http://localhost:3000/${FriendInfo.profilePic}`}
      alt="Profile Picture"
      />
      </p>
      {posts.map((post) => (
      <Post key={post._id} post={post} />
      ))}
    </>
  );
};

export default FriendProfile;
import { useState, useEffect,  } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getFriendPost } from "../../services/posts"
import Post from "../../components/Post/Post";
import NavBar from "../../components/NavBar/NavBar"
import { getFriendInfo } from "../../services/authentication"
import "../../components/Post/Post.css"
import AddFriendButton from "../../components/AddFriendButton";
import { Card } from 'react-bootstrap';
import './FriendProfile.css';
// styling
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

export const FriendProfile = () => {
const [posts, setPosts] = useState([]);
const [token] = useState(window.localStorage.getItem("token"));
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
    <Container className="vw-100" fluid >
        <NavBar />
          <Card>   
            <Card.Img style={{height: 500}} src="../profile_cover_photo/friend_banner.jpg" />
              <Card.ImgOverlay>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <div style={{ textAlign: "center", textDecorationColor: "color" }}>
                  <Image variant="top" style={{width: 100, height: 100, objectFit: 'cover'}}  src={`http://localhost:3000/${FriendInfo.profilePic}`} roundedCircle fluid />
                  <Card.Body>
                    <Card.Title style={{color: "white"}}>{username}</Card.Title>
                    <Card.Text style={{color: "white"}}>
                      Welcome to my profile! I am interested in coding
                    </Card.Text>
                    <AddFriendButton user_id={FriendInfo.user_id} />
                  </Card.Body>
                  </div>
                  </div>
              </Card.ImgOverlay>
          </Card>
        </Container>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
  </>
);
};

export default FriendProfile;
import { useState, useEffect,  } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getFriendPost } from "../../services/posts"
import Post from "../../components/Post/Post";
import NavBar from "../../components/NavBar/NavBar"
import { getFriendInfo } from "../../services/authentication"
import "../../components/Post/Post.css"
import { Card, Col, Row } from 'react-bootstrap';
import './FriendProfile.css';



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
    <div className="container-fluid">
      <h2 className="introduction-container" >Welcome to {username}'s Profile </h2>
      <Row className="align-items-start">
        <Col lg={4} className="mt-4">
        <Card className="mt-4 sticky-card">
          <Card.Img 
          variant="top" 
          src={`http://localhost:3000/${FriendInfo.profilePic}`}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{username}</Card.Title>
            <Card.Text>
              Welcome to my profile! I am interested in coding
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    

    <Col lg={8}>
    {posts.map((post) => (
      <Post key={post._id} post={post} />
    ))}
    </Col>
    </Row>
    </div>
  </>
);
};

export default FriendProfile;



    //   {/* Left-aligned section
    //   <div className="left-aligned-section">
    //     <h3>{username}</h3>
    //     <div className="profile-picture-container">
    //       <img
    //         src={`http://localhost:3000/${FriendInfo.profilePic}`}
    //         alt="Profile Picture"
    //         className="profile-picture"
    //       />
    //     </div>
    //   </div> */}
    


    // {/* Centered posts */}
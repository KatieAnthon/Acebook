import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { MyMessages } from "./pages/Message/MessagePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { UserProfile } from "./pages/User/UserProfile";
import { FriendProfile} from "./pages/User/FriendProfile";


// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/posts",
    element: <FeedPage />,
  },
  {
    path: "/myprofile",
    element: < UserProfile/>,
  },
  {
    path: "/messages",
    element: < MyMessages/>,
  },
  {
    path: "/posts/:username", 
    element: < FriendProfile/>
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

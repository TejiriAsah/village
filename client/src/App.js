import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ProfilePage from "./components/profilePage/ProfilePage";
import Timeline from "./components/timeline/Timeline";
import PostPage from "./components/postPage/PostPage";
import "./App.css";
import Login from "./components/villageIndex/Login";
import SignUp from "./components/villageIndex/SignUp";
import KidsPage from "./components/kidsPage/KidsPage";
import AddKid from "./components/addKid/AddKid";
import KidsProfile from "./components/kidsProfile/KidsProfile";
import EditKid from "./components/editKid/EditKid";
import DeleteKidModal from "./components/modal/DeleteKidModal";
import Requests from "./components/requests/Requests";
import Branches from "./components/branches/Branches";
import ShareKidModal from "./components/modal/ShareKidModal";
import EditActivityModal from "./components/modal/EditActivityModal";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/Actions";
import { store } from "./store/Reducer";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

const PublicLayout = (props) => (
  <div>
    <Switch>
      <Route path="/app/login" component={Login} />
      <Route path="/app/signup" component={SignUp} />
      <Route path="/" component={Login} />
    </Switch>
  </div>
);

const PrivateLayout = (props) => (
  <div className="tester">
    <Home />
    <Switch>
      <PrivateRoute path="/profile" exact component={ProfilePage} />
      <PrivateRoute path="/timeline" component={Timeline} />
      <PrivateRoute path="/posts/post/:postId" component={PostPage} />
      <PrivateRoute path="/branches" exact component={Branches} />
      <PrivateRoute path="/kids" exact component={KidsPage} />
      <PrivateRoute path="/kids/add" component={AddKid} />
      <PrivateRoute
        path="/kids/activities/edit-activity/:id"
        component={EditActivityModal}
      />
      <PrivateRoute path="/kids/child/:id" exact component={KidsProfile} />
      <PrivateRoute path="/kids/edit/:id" component={EditKid} />
      <PrivateRoute path="/kids/:username/:kidId" component={DeleteKidModal} />
      <Route path="/kids/share" component={ShareKidModal} />
      <PrivateRoute path="/requests" component={Requests} />
    </Switch>
  </div>
);
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./app";
  }
}
function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/app" component={PublicLayout} />
          <Route path="/" component={PrivateLayout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;

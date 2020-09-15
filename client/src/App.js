import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ProfilePage from "./components/profilePage/ProfilePage";
import "./App.css";
import Login from "./components/villageIndex/Login";
import SignUp from "./components/villageIndex/SignUp";
import KidsPage from "./components/kidsPage/KidsPage";
import AddKid from "./components/addKid/AddKid";
import KidsProfile from "./components/kidsProfile/KidsProfile";
import EditKid from "./components/editKid/EditKid";
import Requests from "./components/requests/Requests";
import Branches from "./components/branches/Branches";
import ShareKidModal from "./components/modal/ShareKidModal";
import EditActivityModal from "./components/modal/EditActivityModal";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/Actions";
import { store } from "./store/Reducer";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

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
    window.location.href = "./";
  }
}

function App() {
  return (
    <BrowserRouter>
      <div className="tester">
        <Home />
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/profile" exact component={ProfilePage} />
            <PrivateRoute path="/branches" exact component={Branches} />
            <PrivateRoute path="/kids" exact component={KidsPage} />
            <PrivateRoute path="/kids/add" component={AddKid} />
            <PrivateRoute
              path="/kids/activities/edit-activity/:id"
              component={EditActivityModal}
            />
            <PrivateRoute
              path="/kids/child/:id"
              exact
              component={KidsProfile}
            />
            <PrivateRoute path="/kids/edit/:id" component={EditKid} />
            <Route path="/kids/share" component={ShareKidModal} />
            <PrivateRoute path="/requests" component={Requests} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

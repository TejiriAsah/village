import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ProfilePage from "./components/profilePage/ProfilePage";
import "./App.css";
import KidsPage from "./components/kidsPage/KidsPage";
import AddKid from "./components/addKid/AddKid";
import KidsProfile from "./components/kidsProfile/KidsProfile";
import EditKid from "./components/editKid/EditKid";
// import Modal from "./components/modal/Modal";
import Requests from "./components/requests/Requests";
import Branches from "./components/branches/Branches";
import ChangePasswordModal from "./components/modal/ChangePasswordModal";
import ShareKidCard from "./components/modal/ShareKidCard";
import AddAcitivityModal from "./components/modal/AddActivityModal";

function App() {
  return (
    <BrowserRouter>
      <div className="tester">
        <Home />
        <div>
          <Switch>
            <Route path="/profile" exact component={ProfilePage} />
            <Route path="/changepassword" component={ChangePasswordModal} />
            <Route path="/branches" exact component={Branches} />
            <Route path="/kids" exact component={KidsPage} />
            <Route path="/kids/add" component={AddKid} />
            <Route path="/kids/activities" component={AddAcitivityModal} />
            <Route path="/kids/child/:id" exact component={KidsProfile} />
            <Route path="/kids/edit/:id" component={EditKid} />
            <Route path="/kids/share" component={ShareKidCard} />
            <Route path="/requests" component={Requests} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

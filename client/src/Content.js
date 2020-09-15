// import React from "react";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Home from "./components/home/Home";
// import ProfilePage from "./components/profilePage/ProfilePage";
// import "./App.css";
// import KidsPage from "./components/kidsPage/KidsPage";
// import AddKid from "./components/addKid/AddKid";
// import KidsProfile from "./components/kidsProfile/KidsProfile";
// import EditKid from "./components/editKid/EditKid";
// import Requests from "./components/requests/Requests";
// import Branches from "./components/branches/Branches";
// import Login from "./components/villageIndex/Login";
// import ChangePasswordModal from "./components/modal/ChangePasswordModal";
// import ShareKidCard from "./components/modal/ShareKidCard";
// // import EditActivityModal from "./components/modal/EditActivityModal";

// import PrivateRoute from "./components/privateRoute/PrivateRoute";

// function Content() {
//   return (
//     <BrowserRouter>
//       <div className="tester">
//         <Home />
//         <div>
//           <Switch>
//             <Route path="/login" exact component={Login} />
//             <PrivateRoute path="/profile" exact component={ProfilePage} />
//             {/* <Route path="/changepassword" component={ChangePasswordModal} /> */}
//             <PrivateRoute path="/branches" exact component={Branches} />
//             <PrivateRoute path="/kids" exact component={KidsPage} />
//             <PrivateRoute path="/kids/add" component={AddKid} />

//             {/* <PrivateRoute
//               path="/kids/activities/edit-activity/:id"
//               component={EditActivityModal}
//             /> */}
//             <PrivateRoute
//               path="/kids/child/:id"
//               exact
//               component={KidsProfile}
//             />
//             <PrivateRoute path="/kids/edit/:id" component={EditKid} />
//             {/* <Route path="/kids/share" component={ShareKidCard} /> */}
//             <PrivateRoute path="/requests" component={Requests} />
//           </Switch>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default Content;

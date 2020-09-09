const express = require("express");
const shareRouter = express.Router();
const Kids = require("../models/Kid");
const Kid = require("../models/Kid");

//share a child card
// Action = User clicks on share button from kid’s card => POST - Kid’s array of the parent you’re sharing with + Shares database
// “/kids/share/::shareeusername/:kidID”
// Body: (reason, datefrom, datato, timefrom, timeto)
// Get the sharee’s profile from database using the username
// Add kid’s id to their array of kids
// Add body to shares database
// redirecting back to kid’s page

// shareRouter.post("/:receiverusername/:kidId", (req,res) => {
//   Kid.findOne({id: req.params.kidId}, (error,kid) => {
//     if(error) {
//       return res.status(500).json({message: error});
//     }
//     if(!kid){
//       return res.status(404).json({message: "kid not found"})
//     } else{

//     }
//   })
// })

module.exports = shareRouter;

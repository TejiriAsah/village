const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const parentRoutes = require("./routes/parentRoutes");
const indexRoutes = require("./routes/indexRoutes");
const kidRoutes = require("./routes/kidRoutes");
const activityRoutes = require("./routes/activityRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const postRoutes = require("./routes/postRoutes");
const requestRoutes = require("./routes/requestRoutes");
const shareRoutes = require("./routes/shareRoutes");
const branchRoutes = require("./routes/branchRoutes");

mongoose.connect(
  "mongodb+srv://village:village@cluster0.p9psx.mongodb.net/village?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", indexRoutes);
app.use("/profile", parentRoutes);
app.use("/kids", kidRoutes);
app.use("/kids/activities", activityRoutes);
app.use("/profile/reminders", reminderRoutes);
app.use("/posts", postRoutes);
app.use("/requests", requestRoutes);
app.use("/kids/share", shareRoutes);
app.use("/branches", branchRoutes);

app.listen(8080, () => {
  console.log(`Successfully started listening on Port: 8080`);
});

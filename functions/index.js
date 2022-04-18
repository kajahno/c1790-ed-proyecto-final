const { firebase, config } = require("./utils/firebase");
const functions = require("firebase-functions");

// The web server and helper
const app = require("express")();
const cors = require("cors");
app.use(cors());

const { signupUser, updateUser, recoverPassword, deleteUser, logoutUser, loginUser, getUser, guestAccount } = require("./apis/users");
const { newPost, updatePost, deletePost, getPost, getAllPosts } = require("./apis/posts");
const { createComment, updatedComment,  deleteComment } = require("./apis/comments");

// initialize app
firebase.initializeApp(config);

// User routes
app.post("/user", signupUser);
app.post("/user/guest", guestAccount);
app.post("/user/login", loginUser);
app.post("/user/logout", logoutUser);
app.delete("/user/:username", deleteUser);
app.get("/user/:username", getUser);
app.put("/user/:username", updateUser);
app.put("/user/:username", recoverPassword);
// app.post("/user/{username}", listAllUsers);

// Posts routes
app.post("/post", newPost);
app.get("/post", getPost);
app.put("/post", updatePost);
app.delete("/post/:postId", deletePost);
app.get("/post/all", getAllPosts);

// Comments routes
app.post("/post/comment", createComment);
app.put("/post/comment", updatedComment);
app.delete("/post/comment", deleteComment);

exports.api = functions.region(config.gcpRegion).https.onRequest(app);

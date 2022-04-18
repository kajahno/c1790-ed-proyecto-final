const { firebase, db, config } = require("./utils/firebase");
const functions = require("firebase-functions");

// The web server and helper
const app = require("express")();
const cors = require("cors");
app.use(cors());

const { signupUser, updateUser, recoverPassword, deleteUser, logoutUser, loginUser, getUser, guestAccount } = require("./apis/users");

// initialize app
firebase.initializeApp(config);

// const listAllUsers = (nextPageToken) => {
//     // List batch of users, 1000 at a time.
//     getAuth()
//         .listUsers(1000, nextPageToken)
//         .then((listUsersResult) => {
//             listUsersResult.users.forEach((userRecord) => {
//                 console.log('user', userRecord.toJSON());
//             });
//             if (listUsersResult.pageToken) {
//                 // List next batch of users.
//                 listAllUsers(listUsersResult.pageToken);
//             }
//         })
//         .catch((error) => {
//             console.log('Error listing users:', error);
//         });
// };
// // Start listing users from the beginning, 1000 at a time.
// listAllUsers();




// User Post
// funciona
const newPost = (req, res) => {
    const Postuser = {
        username: req.body.username || "",
        post: req.body.post || "",
        tag: req.body.tag || "",
        canLikes: req.body.canLikes || "",
        canUnlike: req.body.canUnlike || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: req.body.title || "",

    };

    if (Postuser.post == undefined) {
        return res.status(400).json({ error: "Missing require parameter" });
    }
    console.log("Starting Upload...", Postuser.username);
    db.collection(`/posts/`)
        .add(Postuser)
        .then((isUid) => {
            return res.status(201).json({ message: "You can see your id in the section ['posts', 'your id']", isUid });
        })
        .catch((error) => {
            res.status(500).json({ error: error.code });
        });
};

// Update User Post
// funciona
const updatePost = (req, res) => {
    const editpost = {
        postId: req.params.postId,
        post: req.body.post || "",
        tags: req.body.tags || "",
        title: req.body.title || "",
        updatedAt: new Date().toISOString(),

    };
    const username = req.body.username;

    if (editpost.post == undefined) {
        return res.status(400).json({ error: "Missing requirement" });
    }

    console.log("Post edited", username);
    db.doc(`/posts/${editpost.postId}`)
        .update(editpost)
        .then((doc) => {
            return res.status(200).json({ message: "Post updated successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: error.code });
        });
};

//Delete a Post
//funciona
const deletePost = (req, res) => {
    const delet = {
        postId: req.params.postId,
        username: req.body.username,
        title: req.body.title,
        post: req.body.post || "",
    };
    db.doc(`/posts/${delet.username}`)
        .delete(delet)
        .then((doc) => {
            return res.status(200).json({ message: "Post updated successfully" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error.code });
        });

}

//Create a comment

const createComment = (req, res) => {
    const newComment = {
        username: req.body.username,
        comment: req.body.comment,

    };
    if (newComment.comment === undefined) {
        return res.status(400).json({ error: "Missing require parameter" });
    }

    console.log("Starting Upload...", newComment.username);
    db.doc("comments")
        .add(newComment)
        .then((doc) => {
            return res.status(201).json({ message: "Post created successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: error.code });
        });
    console.log(req);
};

//Update a Comment 

const updatedComment = (req, res) => {
    const comment = {
        comment: req.body.comment,
        commentId: req.body.commentId,

    };
    if (comment.commentId == undefined) {
        return res.status(400).json({ error: "Missing requirement" });
    }

    console.log("Post edited", user.username);
    db.doc(`/comments/${comment.commentId}`)
        .get()
        .then((comment) => {
            if (!comment.exists) {
                throw {
                    code: "comment/non-existent",
                    error: new Error(),
                };
            } else {
                const existingComment = doc.data();
                const updatedComment = {
                    post: comment.post || existingComment.commentId,

                };
                return db.doc(`/posts/${comment.commentId}`).update(updatedComment);
            }
        })
        .then(() => {
            return res.satus(200).json({ message: "Comment updated successfully" });
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "comment/non-existent") {
                return res
                    .status(400)
                    .json({ username: "Comment doesn't exist in the system" });
            }
            res.status(500).json({ error: error.code });
        });

};

//Delete a comment

const deleteComment = (req, res) => {
    const delet = {
        commentId: req.body.postId,

    };

    db.doc(`/comment/${comment.commentId}`)
        .delete()
        .then(() => {
            return res.satus(200).json({ message: "comment deleted successfully" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error.code });
        });
}


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


app.post("/post", newPost);
app.put("/post", updatePost);
app.delete("/post", deletePost);
//app.post("/post/comment", createComment);
// app.post("/posts/comments}", updatedComment);
// app.post("/posts/comments}", deleteComment);

exports.api = functions.region(config.gcpRegion).https.onRequest(app);

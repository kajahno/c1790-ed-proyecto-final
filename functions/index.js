const firebase = require("firebase");
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// The web server and helper
const app = require("express")();
const cors = require("cors");
app.use(cors());

// Helper to load configurations
const dotenv = require("dotenv");
const { UserRecord } = require("firebase-admin/lib/auth/user-record");
const { document, _documentWithOptions } = require("firebase-functions/v1/firestore");
const { database } = require("firebase-admin");
const { isUid } = require("firebase-admin/lib/utils/validator");
const { identityOrigin } = require("firebase-tools/lib/api");
const { getCommand } = require("firebase-tools");
dotenv.config();

const db = admin.firestore();

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    gcpRegion: process.env.GCP_REGION || "europe-west2",
};

// initialize app
firebase.initializeApp(config);

const signupUser = (req, res) => {

    const newUser = {
        email: req.body.email || "",
        password: req.body.password || "",
        confirmPassword: req.body.confirmPassword || "",
        username: req.body.username || "",
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        location: req.body.location || "",
        userId: req.body.userId || "",
        bio: req.body.bio || "",
        website: req.body.website || "",
        imageProfile: req.body.imageProfile || "",
        lastSeen: new Date().toISOString(),
    };

    console.log("user getting created: ", newUser.username);

    // TODO: validate data. Return error when no valid, e.g. password is not the same as confirmPassword

    let token, userId;

    db.doc(`/users/${newUser.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                throw {
                    code: "auth/email-already-in-use",
                    error: new Error()
                };
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        newUser.email,
                        newUser.password
                    );
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                ...newUser,
                createdAt: new Date().toISOString(),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/no-img.png?alt=media`,
                userId,
            };
            return db.doc(`/users/${newUser.username}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "auth/email-already-in-use") {
                return res
                    .status(400)
                    .json({ email: "this email is already in use" });
            }
            res.status(500).json({ error: error.code });
        });
};

//Create guest account
//funciona
const guestAccount = (req, res) => {
    const newGuest = {
        userId: req.body.userId || "",
        username: req.body.username ||"",
        imageProfile: req.body.imageProfile ||"",
        
    };
    if (newGuest.username == undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    db.doc(`/guest-users/${newGuest.username}`)
        .create(newGuest)
        .then((doc) => {
            return res.status(201).json({ message: "Guest account created successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: error.code });
        });
};



//recover password
// error 
const recoverPassword = (req, res) => {
    const recoveruser = {
    username: req.body.username ||"",
    email: req.body.email,
    userId: req.body.userId ||"",
    newPassword: req.body.newPassword ||"",
    confirmPassword:req.body.confirmPassword ||"",
    };
    db.doc(`/users/${recoveruser.username}`)
    .get()
    .then((doc) => {
        if (!doc.exists) {
            throw {
                code: "user/non-existent",
                error: new Error(),
            };
        } else {
          console.log('paso', recoveruser.email)
           return firebase
           .auth()
           .sendPasswordResetEmail(recoveruser.email)
        }
    }) 
    .then(() => {
        return res.status(200).json({ message: "A password reset email has been sent to your email" });
    })
    .catch((error) => {
        console.error(error);
    });
};


const loginUser = (req, res) => {

    const user = {
        email: req.query.email,
        password: req.query.password,
    };

    // TODO: validate login data (nice to have, but don't bother)

    console.log(user);

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            return userCredential.user.getIdToken();
        })
        .then((token) => {
            return res.status(200).json({ token });
        })
        .catch((error) => {
            console.error(error);

            if (
                error.code === "auth/wrong-password" ||
                error.code === "auth/user-not-found"
            ) {
                return res.status(403).json({
                    general: "email does not exist or password is invalid",
                });
            }
            return res.status(500).json({ general: error.code });
        });
};


const logoutUser = (req, res) => {
    // To do, this doesn't work at the moment, needs fixed.
    firebase.auth().signOut().then(function () {
        console.log('Signed out');
    })
        .catch(function (error) {
            console.error('Sign out error', error);
        });
}

const deleteUser = (req, res) => {
    const username = req.params.username;
    db.doc(`/users/${username}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                throw {
                    code: "user/non-existent",
                    error: new Error(),
                };
            } else {
                return db.doc(`/users/${username}`).delete();
            }
        })
        .then(() => {
            return res.status(200).json({ message: "user deleted successfully" });
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "user/non-existent") {
                return res
                    .status(400)
                    .json({ username: "username doesn't exist in the system" });
            }
            res.status(500).json({ error: error.code });
        });
}

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


//Update user profile
const updateUser = (req, res) => {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            location: req.body.location,
            bio: req.body.bio,
            website: req.body.website,
            imageProfile: req.body.imageProfile,
        };
    
        const authToken = req.headers.authorization;
    
        if (!authToken) {
            return res.status(401).json({ message: "not authenticated" });
        }
    
        console.log("User Profile to be updated", user.username);
    
        const username = req.params.usernam;
    
        // TODO: validate data. Return error when no valid, e.g. password is not the same as confirmPassword
        db.doc(`/users/${username}`)
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    throw {
                        code: "user/non-existent",
                        error: new Error(),
                    };
                } else {
                    const existingUser = doc.data();
                    // console.log("existingUser", existingUser);
                    // console.log("user", user);
                    const updatedUser = {
                        firstName: user.firstName || existingUser.firstName,
                        lastName: user.lastName || existingUser.lastName,
                        location: user.location || existingUser.location,
                        bio: user.bio || existingUser.bio,
                        website: user.website || existingUser.website,
                        imageProfile: user.imageProfile || existingUser.imageProfile,
                    };
                    // console.log("updatedUser", updatedUser);
                    return db.doc(`/users/${username}`).update(updatedUser);
                }
            })
            .then(() => {
                return res.status(200).json({ message: "user updated successfully" });
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "user/non-existent") {
                    return res
                        .status(400)
                        .json({ username: "username doesn't exist in the system" });
                }
                res.status(500).json({ error: error.code });
            });
};


 

// User Post
// funciona
const newPost = (req, res) => {
    const Postuser = {
        username: req.body.username ||"",
        post: req.body.post ||"",
        tag: req.body.tag ||"",
        canLikes: req.body.canLikes ||"",
        canUnlike: req.body.canUnlike ||"",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: req.body.title ||"",
        
    };

    if (Postuser.post == undefined) {
        return res.status(400).json({ error: "Missing require parameter" });
    }
    console.log("Starting Upload...", Postuser.username);
    db.collection(`/posts/`)
        .add(Postuser)
        .then((isUid) => {
            return res.status(201).json({message: "You can see your id in the section ['posts', 'your id']", isUid});
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
        post: req.body.post ||"",
        tags: req.body.tags ||"",
        title: req.body.title ||"",
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
        post: req.body.post ||"",
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
app.put("/user/:username", updateUser);
app.put("/user/username", recoverPassword);
// app.post("/user/{username}", listAllUsers);
app.post("/post", newPost);
app.put("/post", updatePost);
app.delete("/post", deletePost);
//app.post("/post/comment", createComment);
// app.post("/posts/comments}", updatedComment);
// app.post("/posts/comments}", deleteComment);


// Test so you know how to add other methods
app.get("/test", (req, res) => {
    return res.status(200).json({
        message: "hey there!"
    })
});

exports.api = functions.region(config.gcpRegion).https.onRequest(app);

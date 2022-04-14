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
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        username: req.body.username,
        firstname : req.body.firstname,
        lastName: req.body.lastName,
        location: req.body.location,
        userId: req.body.userId,
        bio: req.body.bio,
        website: req.body.website,
        picture: req.body.picture,
        lastSeen : new Date().toISOString(),
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
                username: newUser.username,
                email: newUser.email,
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

const loginUser = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    // TODO: validate login data (nice to have, but don't bother)

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
    firebase.auth().signOut().then(function() {
        console.log('Signed out');
    })
    .catch(function(error) {
        console.error('Sign out error', error);
    });
}

const deleteUser = (req, res) => {
    // This works
    user.delete().then(function() {
    // User deleted.
    var ref = firebase.database().ref(
       "users/".concat(user.uid, "/")
    );
    ref.remove();
 });
 firebase
        .auth()
        .deleteUser(uid)
  .then(() => {
    console.log('Successfully deleted user');
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });
}

const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    getAuth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          console.log('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });
  };
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();

//Update user profile

const updateUser = (req, res) => {
    const user = {
      firstname: req.body.firstname,
      lastName: req.body.lastName,
      location: req.body.location,
      bio: req.body.bio,
      website: req.body.website,
      imageProfile: req.body.imageProfile,
    };
  
    console.log("User Profile updated", user.username);
  
    // TODO: validate data. Return error when no valid, e.g. password is not the same as confirmPassword
    db.doc(`/users/${user.username}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          throw {
            code: "user/non-existent",
            error: new Error(),
          };
        } else {
          const existingUser = doc.data();
          const updatedUser = {
            firstname: user.firstname || existingUser.firstName,
            lastName: user.lastName || existingUser.lastName,
            location: user.location || existingUser.location,
            bio: user.bio || existingUser.bio,
            website: user.website || existingUser.website,
            imageProfile: user.imageProfile || existingUser.imageProfile,
          };
          return db.doc(`/users/${newUser.username}`).update(updatedUser);
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

const newPost = (req, res) => {
    const Post = {
      username: req.user.username,
      post: req.body.post,
      tags: req.body.tags,
      canLikes: req.body.canLikes,
      canUnlike: req.body.canUnlike,
  
    };
    if (Post.post == undefined) {
      return res.status(400).json({ error: "Missing require parameter" });
    }
  
    console.log("Starting Upload...", newUser.username);
  
    db.collections("posts")
      .add(Post)
      .then( (doc) => {
        return res.status(201).json({ message: "Post created successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.code });
      });
  };

  // Update User Post

const updatedPost = (req, res) => {
    const post = {
        post: req.body.post,
        tags: req.body.tags,
        postId: req.body.postId,
        
    };
    if (post.post == undefined ) {
        return res.status(400).json({ error: "Missing requirement"});
    }

    console.log("Post edited", user.username);
     db.doc(`/posts/${post.postId}`)
        .get()
        .then((Post) => {
            if (!Post.exists){
                throw{
                    code: "post/non-existent",
                    error: new Error(),
                };
            } else {
                const existingPost = doc.data();
                const updatedPost = {
                    post: post.post || existingPost.post,
                    tags: post.tags || existingPost.tags,
                };
                return db.doc(`/posts/${post.postId}`).update(updatedPost);
            }
        })
        .then(() => {
            return res.satus(200).json({ message: "Post updated successfully" });
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "post/non-existent") {
                return res
                .status (400)
                 .json({ username: "Post doesn't exist in the system" });
            }
            res.status(500).json({ error: error.code });
        });

};

//Delete a Post

const deletePost = (req, res) => {
    const delet = {
        postId: req.body.postId,
        
    };

    db.doc(`/posts/${post.postId}`)
        .delete()
        .then(() => {
            return res.satus(200).json({ message: "Post updated successfully" });
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
    if (comment.comment === undefined) {
        return res.status(400).json({ error: "Missing require parameter" });
    }

    console.log("Starting Upload...", newUser.username);

    db.collection("comments")
        .add(newComment)
        .then((doc) => {
            return res.status(201).json({ message: "Post created successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: error.code });
        });
};

//Update a Comment 

const updatedComment = (req, res) => {
    const comment = {
        comment: req.body.comment,
        commentId: req.body.commentId,
        
    };
    if (comment.commentId == undefined ) {
        return res.status(400).json({ error: "Missing requirement"});
    }

    console.log("Post edited", user.username);
     db.doc(`/comments/${comment.commentId}`)
        .get()
        .then((comment) => {
            if (!comment.exists){
                throw{
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
                .status (400)
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
app.post("/user/login", loginUser);
app.post("/user/logout", logoutUser);
app.post("/user/{username}", deleteUser);
app.post("/user/{username}", updateUser);
app.post("/user/{username}", listAllUsers);
app.post("/posts", newPost);
app.post("/posts}", updatedPost);
app.post("/posts}", deletePost);
app.post("/posts/comments}", createComment);
app.post("/posts/comments}", updatedComment);
app.post("/posts/comments}", deleteComment);






// Test so you know how to add other methods
app.get("/test", (req, res) => {
  return res.status(200).json({
    message: "hey there!"
  })
});

exports.api = functions.region(config.gcpRegion).https.onRequest(app);

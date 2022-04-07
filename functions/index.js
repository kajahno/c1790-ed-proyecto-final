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
    };

    console.log("user getting created: ", newUser.username);

    // TODO: validate data. Return error when no valid, e.g. password is not the same as confirmPassword

    let token, userId;

    db.doc(`/users/${newUser.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res
                    .status(400)
                    .json({ username: "this username is already taken" });
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
            userId = data.user.userId;
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


// User routes
app.post("/user", signupUser);
app.post("/user/login", loginUser);

// Test so you know how to add other methods
app.get("/test", (req, res) => {
  return res.status(200).json({
    message: "hey there!"
  })
});

exports.api = functions.region(config.gcpRegion).https.onRequest(app);

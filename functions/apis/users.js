
const { db, firebase, config } = require("../utils/firebase");

const signupUser = (req, res) => {

    const newUser = {
        email: req.body.email || "",
        password: req.body.password || "",
        confirmPassword: req.body.confirmPassword || "",
        username: req.body.username || "",
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        location: req.body.location || "",
        bio: req.body.bio || "",
        website: req.body.website || "",
        imageProfile: req.body.imageProfile || "",
        lastSeen: new Date().toISOString(),
    };

    console.log("user getting created: ", newUser.username);

    if (newUser.password !== newUser.confirmPassword) {
        return res
            .status(400)
            .json({ password: "passwords don't match" });
    }

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

const getUser = (req, res) => {

    const username = req.params.username;
    db.doc(`/users/${username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log("all good until here");
                const data = doc.data();
                res.status(200).json(data);
            } else {
                throw {
                    code: "auth/user-doesnt-exist",
                    error: new Error()
                };
            }
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "auth/user-doesnt-exist") {
                return res
                    .status(400)
                    .json({ user: "username doesnt exist" });
            }
            res.status(500).json({ error: error.code });
        });
};

//Update user profile
const updateUser = (req, res) => {

    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ message: "not authenticated" });
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        location: req.body.location,
        bio: req.body.bio,
        website: req.body.website,
        imageProfile: req.body.imageProfile,
    };

    const username = req.params.username;
    console.log("User Profile to be updated", username);

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
                console.log("existingUser", existingUser);
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

const recoverPassword = (req, res) => {
    const recoveruser = {
        username: req.body.username || "",
        email: req.body.email,
        userId: req.body.userId || "",
        newPassword: req.body.newPassword || "",
        confirmPassword: req.body.confirmPassword || "",
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

const loginUser = (req, res) => {

    const user = {
        email: req.query.email,
        password: req.query.password,
    };

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

//Create guest account
//funcionaba
const guestAccount = (req, res) => {
    const newGuest = {
        username: req.body.username || "",
        imageProfile: req.body.imageProfile || "",
    };

    if (newGuest.username == undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    db.collection("guest-users").where("username", "==", newGuest.username)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.length !== 0) {
                throw {
                    code: "user/already-exist",
                    error: new Error(),
                };
            }

            return db.collection('guest-users')
                .add(newGuest);
        })
        .then((docRef) => {
            const guestUserId = docRef.id;
            return res.status(201).json({
                message: "Guest account created successfully",
                guestUserId
            });
        })
        .catch((error) => {
            if (error.code === "user/already-exist") {
                return res
                    .status(400)
                    .json({ username: "guest username already exists" });
            }
            res.status(500).json({ error: error.code });
        });
};


// User Post
// funciona

module.exports = { signupUser, updateUser, recoverPassword, deleteUser, logoutUser, loginUser, getUser, guestAccount };
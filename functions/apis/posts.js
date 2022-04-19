const { db, firebase, config } = require("../utils/firebase");

const newPost = (req, res) => {
    const Postuser = {
        username: req.body.username || "",
        post: req.body.post || "",
        tags: req.body.tags || "",
        canLikes: req.body.canLikes || false,
        canUnlike: req.body.canUnlike || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: req.body.title || "",
    };

    if (Postuser.title == undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    if (Postuser.post == undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    if (Postuser.username == undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    //TODO: validate the user publishing the post exists in the 
    // database
    console.log("Starting publishing post...", Postuser.username);
    db.collection('posts')
        .add(Postuser)
        .then((docRef) => {
            return res.status(201).json({ message: "post has been published", postId: docRef.id });
        })
        .catch((error) => {
            res.status(500).json({ error: error.code });
        });
};

const getPost = (req, res) => {

    const username = req.body.username;


    db.doc(`/posts/${username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log("all good until here");
                const data = doc.data();
                res.status(200).json(data);
            } else {
                throw {
                    code: "auth/post-doesnt-exist",
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

const getAllPosts = (req, res) => {
    
    db.collection('posts')
        .get()
        .then((querySnapshot) => {
            
            let allPosts = [];

            querySnapshot.forEach((doc) => {
                post = {
                    ...doc.data(),
                    postId: doc.id
                }
                allPosts.push(post);
            });
        
            console.log(allPosts);
            return res.status(200).json(allPosts);
        })
        .catch((error) => {
            res.status(500).json({ error: error.code });
        });
};

const updatePost = (req, res) => {

    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ message: "not authenticated" });
    }
    
    const post = {
        postId: req.body.postId,
        post: req.body.post,
        tags: req.body.tags,
        title: req.body.title,
        updatedAt: new Date().toISOString(),
        username: req.body.username
    };

    if (post.postId == undefined) {
        return res.status(400).json({ error: "missing postId" });
    }

    db.doc(`/posts/${post.postId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                throw {
                    code: "post/non-existent",
                    error: new Error(),
                };
            } else {
                const existingPost = doc.data();

                const updatedPost = {
                    username: post.username || existingPost.username,
                    title: post.title || existingPost.title,
                    tags: post.tags || existingPost.tags
                };
                return db.doc(`/posts/${post.postId}`).update(updatedPost);
            }
        })
        .then(() => {
            return res.status(200).json({ message: "Post updated successfully" });
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "post/non-existent") {
                return res
                    .status(400)
                    .json({ error: "post doesn't exist in the system" });
            }
            res.status(500).json({ error: error.code });
        });
};

const deletePost = (req, res) => {
    const postId = req.params.postId;
    db.doc(`/posts/${postId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                throw {
                    code: "post/non-existent",
                    error: new Error(),
                };
            } else {
                return db.doc(`/posts/${postId}`).delete();
            }
        })
        .then(() => {
            return res.status(200).json({ message: "post deleted successfully" });
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "post/non-existent") {
                return res
                    .status(400)
                    .json({ postId: "post doesn't exist in the system" });
            }
            res.status(500).json({ error: error.code });
        });
}

module.exports = { newPost, updatePost, deletePost, getPost, getAllPosts };
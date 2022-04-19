
const { db, firebase, config } = require("../utils/firebase");


const createComment = (req, res) => {
    const newComment = {
        username: req.body.username,
        title: req.body.title,
        post: req.body.post,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

    };
    if (newComment.title == undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    if (newComment.postId == undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    if (newComment.username == undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    //TODO: validate the user publishing the post exists in the 
    // database
    console.log("Starting publishing comment...", newComment.username);
    db.collection('comments')
        .add(newComment)
        .then((docRef) => {
            return res.status(201).json({ message: "post has been published", commentId: docRef.id });
        })
        .catch((error) => {
            res.status(500).json({ error: error.code });
        });
};


const updatedComment = (req, res) => {

    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ message: "not authenticated" });
    }
    const comment = {
        username: req.body.username,
        postId: req.body.postId,
        post: req.body.post,
        title: req.body.title,
        updatedAt: new Date().toISOString(),

    };

    if (comment.postId == undefined) {
        return res.status(400).json({ error: "Missing requirement" });
    }
    db.doc(`/comments/${comment.postId}`)
    .get()
    .then((doc) => {
        if (!doc.exists) {
            throw {
                code: "comment/non-existent",
                error: new Error(),
            };
        } else {
            const existingComment = doc.data();

            const updatedPost = {
                username: post.username || existingComment.username,
                title: post.title || existingComment.title,
                tags: post.tags || existingComment.tags
            };
            return db.doc(`/comments/${comment.postId}`).update(updatedPost);
        }
    })
    .then(() => {
        return res.status(200).json({ message: "Post updated successfully" });
    })
    .catch((error) => {
        console.error(error);
        if (error.code === "comment/non-existent") {
            return res
                .status(400)
                .json({ error: "comment doesn't exist in the system" });
        }
        res.status(500).json({ error: error.code });
    });
};

const deleteComment = (req, res) => {

    const commentId = req.params.commentId;

    db.doc(`/comments/${commentId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                throw {
                    code: "comment/non-existent",
                    error: new Error(),
                };
            } else {
                return db.doc(`/comments/${commentId}`).delete();
            }
        })
        .then(() => {
            return res.status(200).json({ message: "comment deleted successfully" });
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "comment/non-existent") {
                return res
                    .status(400)
                    .json({ commentId: "comment doesn't exist in the system" });
            }
            res.status(500).json({ error: error.code });
        });
}

module.exports = {createComment, updatedComment,  deleteComment  };


const { db, firebase, config } = require("../utils/firebase");


const createComment = (req, res) => {
    const newComment = {
        username: req.body.username,
        title: req.body.title,
        post: req.body.post,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

    };
    if (newComment.post === undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    console.log("Starting Upload...", newComment.username);
    db.collection(`/comments/`)
        .add(newComment)
        .then((doc) => {
            return res.status(201).json({ message: "Post created successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: error.code });
        });
        console.log(req);
};


const updatedComment = (req, res) => {
    const comment = {
        post: req.body.post,
        title: req.body.title,
        updatedAt: new Date().toISOString(),

    };
   const username = req.body.username;

    if (comment.post == undefined) {
        return res.status(400).json({ error: "Missing requirement" });
    }

    console.log("Post edited", username);
    db.doc(`/comments/${username}`)
    .update(comment)
    .then((doc) => {
        return res.status(200).json({ message: "Post updated successfully" });
    })
    .catch((error) => {
        res.status(500).json({ error: error.code });
        });
};

const deleteComment = (req, res) => {
    const delet = {
        username: req.body.username,
        title: req.body.title,
        post: req.body.post,

    };

    db.doc(`/comments/${delet.username}`)
        .delete(delet)
        .then((doc) => {
            return res.satus(200).json({ message: "comment deleted successfully" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error.code });
        });
}

module.exports = {createComment, updatedComment,  deleteComment  };

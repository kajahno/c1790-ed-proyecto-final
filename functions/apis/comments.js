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
    if (newComment.username === undefined) {
        return res.status(400).json({ error: "Missing required parameter"});
    }
    if (newComment.title === undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    console.log("Starting Upload...", newComment.username);
    db.collection(`/comments/`)
        .add(newComment)
        .then((docRef) => {
            return res.status(201).json({ message: "Post created successfully", postId: docRef.id});
        })
        .catch((error) => {
            res.status(500).json({ error: error.code });
        });
        
};


const updatedComment = (req, res) => {

    const authToken = req.headers.authorization;
    if (!authToken){
        return res.status(401).json({ message: "not authenticated" });
    }
    const comment = {
        commentId: req.body.commentId,
        comment: req.body.comment,
        updatedAt: new Date().toISOString(),
        username: req.body.username

    };

   if (comment.commentId == undefined) {
       return res.status(400).json({ error: "Missing CommentId"})
   }

    db.doc(`/comments/${comment.commentId}`)
        .get()
        then((doc) => {
            if (!doc.exists) {
                throw {
                    code: "comment/non-existent",
                    error: new Error(),
                };
            } else {
                const existingComment = doc.data();

                const updatedComment = {
                    username: comment.username || existingComment.username,
                    comment: comment.comment || existingComment.comment
                };
                return db.doc(`/comments/${comment.commentId}`).update(updatedComment);
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
                    .json({error: "Comment doesnt exists in the system" });
                } 
                res.status(500).json({ error: error.code });
        });
}

const deleteComment = (req,res) =>{
    const commentId = req.params.commentId
    db.doc(`/comment/${commentId}`)
    .get()
    .then((doc) => {
        if (!doc.exists) {
            throw {
                code: "comment/non-existent",
                error: new Error(),
            };
        } else {
            return db.doc (`/comment/${commentId}`).delete();
        }
    })
    .then(() => {
        return res.status(200).json({ message: "Comment deleted successfully" });
    })
    .catch((error) => {
        console.error(error);
        if (error.code === "comment/non-existent") {
            return res
                .status(400)
                .json({commentID: "Comment doesnt exist in the system" });
        }
        res.status(500).json({ error: error.code });
    });
}

//Aun en prueba 

//const deleteComment = (req,res) =>{
//    const commentId = req.params.commentId
//    db.doc(`/comment/${commentId}`)
//    .get()
//    .then((doc) => {
//        if (!doc.exists) {
//            throw {
//                code: "comment/non-existent",
//                error: new Error(),
//            };
//        } else {
//            return db.doc (`/comment/${commentId}`).delete();
//        }
//    })
//    .then(() => {
//        return res.status(200).json({ message: "Comment deleted successfully" });
//    })
//    .catch((error) => {
//        console.error(error);
//        if (error.code === "comment/non-existent") {
//            return res
//                .status(400)
//                .json({commentID: "Comment doesnt exist in the system" });
//        }
//        res.status(500).json({ error: error.code });
//    });
//}

//Aun en prueba
//const newComment = (req, res) => {
//    const Postcomment = {
//      postId: req.body.username ||"",
//      post: req.body.post || "",
//
//    };
//   if (Postcomment.post == undefined) {
//      return res.status(400).json({ error: "Missing required parameter" });
//    }
//    console.log("New Comment is being created...", Postcomment.username);
//  
//    db.collection(`/post/`)
//      .add(Postcomment)
//      .then((doc) => {
//        return res.status(201).json({ message: "Comment created successfully" });
//  
//    })
//     .catch ((error) => {
//        res.status(500).json({ error: error.code });
//      });
//};

module.exports = {createComment, updatedComment,  deleteComment  };
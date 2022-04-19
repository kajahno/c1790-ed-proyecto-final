import axios from "axios";


export const getComments = async () => {

  // TODO: call endpoint using axios

  let posts = []

  axios
    .get('/post/all')
    .then((res) => {
      console.log("server data: ", res.data);
      posts = res.data;
    })
    .catch((error) => {
      console.log("there wer eerrors");
    });

  return posts;
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "/userid",
    username: "/username",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
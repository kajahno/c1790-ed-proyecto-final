import axios from "axios";

export const getComments = async () => {
    return [
      {
        id: "1",
        header:"This is a title",
        body: "Welcome to our beloved board",
        username: "Intro Bot",
        userId: "1",
        parentId: null,
        createdAt: new Date().toISOString(),
      },

    ];
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
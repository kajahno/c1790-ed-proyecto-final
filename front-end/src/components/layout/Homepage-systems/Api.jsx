import axios from "axios";

export const getComments = async () => {
    return [
      {
        id: "1",
        body: "First comment",
        username: "Username",
        userId: "1",
        parentId: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        body: "Second comment",
        username: "Username 3",
        userId: "2",
        parentId: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        body: "First comment first child",
        username: "Username 2",
        userId: "2",
        parentId: "1",
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        body: "Second comment second child",
        username: "Username 4",
        userId: "2",
        parentId: "2",
        createdAt: new Date().toISOString(),
      },
    ];
  };
  
  export const createComment = async (text, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: "1",
      username: "Andy",
      createdAt: new Date().toISOString(),
    };
  };
  
  export const updateComment = async (text) => {
    return { text };
  };
  
  export const deleteComment = async () => {
    return {};
  };
import chalk from 'chalk';
import boxen from 'boxen';
import yargs, { demandOption } from 'yargs';
import axios from "axios";

const greeting = chalk.white.bold("Welcome to ConnectMe CLI!");

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
};
const msgBox = boxen(greeting, boxenOptions);

// console.log(msgBox);

// Cli commands implementation
// TODO: move to a different folder so it looks more tidy

// ==> authentication <==

//*signup
const signUp = (args) => {

    const { email, password, username, firstName, lastName,
        website, location, picture, bio, birthday } = args;

    const newUserData = {
        email,
        password,
        confirmPassword: password,
        username,
        firstName,
        lastName,
        bio,
        website,
        location,
        picture,
        birthday,
    };

    console.log(chalk.yellow.bold("Creating a new account..."));

    axios
        .post("/user", newUserData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("Account created successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not create account -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

// *definition of create guest command
const guestSignUp= (args) => {

    const { picture, username } = args;

    const guestuserdata= {
        picture,
        username,
    };

    console.log(chalk.yellow.bold("Creating a guest account..."));

    axios
        .post("/user/guest", guestuserdata)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("user guest created successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not create aguest account -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

//* Login 
const login = (args) => {

    const { password, username } = args;

    const useUserData = {
        password,
        username,
    };

    console.log(chalk.yellow.bold("login..."));

    axios
        .post("/user/login", useUserData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("login successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not login -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

// implement user/logout
   {  console.log(chalk.yellow.bold("Logging out..."));

    axios
        .post("/user/logout")
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            
            console.log(chalk.green.bold(" successfully operation ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not log out: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });

    }
//* recover 
const recover = (args) => {

    const { username, newPassword, confirmPassword } = args;

    const recoverUserData = {
        username,
        newPassword,
        confirmPassword,
    };

    console.log(chalk.yellow.bold("recovering..."));

    axios
        .put("/user/recover", recoverUserData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("recover successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not recover the account -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

//* delete 
const deleteuser = (args) => {

    const { username } = args;

    const deleteUserData = {
        username,
    };

    console.log(chalk.yellow.bold("borrando..."));

    axios
        .delete(`/user/${deleteUserData.username}`)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("the account has been deleted successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not delete this account -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

// ==> user progile <===

//* getuser 
const getUser = (args) => {

    console.log(chalk.yellow.bold("getting user..."));

    const { username } = args;
    
        const getUserData = {
            username
        };

    axios
        .get(`/user/${username}`, getUserData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("you got the user successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not obtain the account -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

//* updated user 
const updateUser = (args) => {

    const { password, confirmPassword, username, firstName, 
    lastName, email, bio, website, location, picture, birthday } = args;

    const updateUserData = {
        password,
        confirmPassword,
        username,
        firstName,
        lastName,
        email,
        bio,
        website,
        location,
        picture,
        birthday
    };

    console.log(chalk.yellow.bold("updating..."));

    axios
        .put(`/user/${username}`, updateUserData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold(" update successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not update this account -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}
//get post command definition
const getPost = (args) => {

    console.log(chalk.yellow.bold("getting post..."));

    const { postId } = args;
    
        const getPostData = {
            postId
        };

    axios
        .get("/posts", getPostData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("you got the post successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not obtain the post -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}
//create post command definition
const createPost = (args) => {

    const { post, canLike, canUnlike, likes, tag } = args;

    const postData = {
        post,
        canLike,
        canUnlike,
        likes,
        tag
    };

    console.log(chalk.yellow.bold("posting..."));

    axios
        .post("/posts", postData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("post created successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not create the post -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}
//update post command definition
const updatePost = (args) => {

    const { canLike, canUnlike, likes, tag } = args;

    const putPostData = {
        canLike,
        canUnlike,
        likes,
        tag
    };

    console.log(chalk.yellow.bold("editing the post..."));

    axios
        .put("/posts", putPostData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("post updated successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not update this post -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

/*  Delete post    */
const deletePost = (args) => {

    const { postId } = args;

    const deletePostData = {
        postId
    };

    console.log(chalk.yellow.bold("deleting..."));

    axios
        .delete("/posts", deletePostData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("post deleted successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not delete the post -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

/* View comments */
const viewComment = (args) => {

    const { postId } = args;

    const viewCommentData = {
        postId
    };

    console.log(chalk.yellow.bold("View commens..."));

    axios
        .post("/posts/comments", viewCommentData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
    
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not view this comment -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

/*  Create comment    */
const createComment = (args) => {

    const { comment, postId } = args;

    const createCommentData = {
        postId,
        comment
    };

    console.log(chalk.yellow.bold("deleting..."));

    axios
        .post("/posts/comments", createCommentData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("The comment was created successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not create the comment -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

//>> Operations about friendship <<

/*  add friend  */
const addafriend = (args) => {

    const { username,userId } = args;

    const addfriendData = {
        username,
        userId
    };

    console.log(chalk.yellow.bold("adding..."));

    axios
        .post("/friend", addfriendData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("the friend was added successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could add a friend -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

/*  delete friend  */
const deleteafriend = (args) => {

    console.log(chalk.yellow.bold("deleting..."));

    axios
        .delete("/friend", addfriendData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("the friend was delete successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could delete a friend -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

/*  block friend  */
const blockeafriend = (args) => {

    console.log(chalk.yellow.bold("blocking..."));

    axios
        .put("/friend", addfriendData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("the friend was blocked successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could block a friend -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

/*  friend list */
const listoffriend = (args) => {

    console.log(chalk.yellow.bold("charging..."));

    axios
        .get("/friend/all", addfriendData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.green.bold("loading friends list ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could view friend list -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

//>> Operations about group friends <<

// Create a group of friends
const createGroup = (args) => {

    const createGroupData = {
      
    };

    console.log(chalk.yellow.bold("Creating group..."));

    axios
        .post("/group", createGroupData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            console.log(chalk.green.bold("the group was created successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not create a group -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

// Edit a group of friends
const editGroup = (args) => {

    const editGroupData = {
      
    };

    console.log(chalk.yellow.bold("Editing group..."));

    axios
        .put("/group", editGroupData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            console.log(chalk.green.bold("the group was created successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not create a group -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

// Delete a group of friends
const deleteGroup = (args) => {

    const deleteGroupData = {
      
    };

    console.log(chalk.yellow.bold("Deleting group..."));

    axios
        .delete("/group", deleteGroupData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            console.log(chalk.green.bold("the group was deleted successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not delete this group -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

// View a list of friends groups
const listGroup = (args) => {

    const listGroupData = {
      
    };

    console.log(chalk.yellow.bold("Looking for the list of groups..."));

    axios
        .get("/group/all", listGroupData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            console.log(chalk.green.bold("The operation was successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not view the list of group -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

// Back-end configuration
// URLS:
// Production -> https://europe-west2-c1790-ed-proyecto-final.cloudfunctions.net/api
// Local development -> http://localhost:5001/c1790-ed-proyecto-final/europe-west2/api
axios.defaults.baseURL =
    "http://localhost:5001/c1790-ed-proyecto-final/europe-west2/api";

// CLI interface definition
const y = yargs();
y.scriptName("connectme")
y.usage("Usage: -n <name>");
y.command({
    command: 'signup',
    describe: 'Creates a new account',
    builder: {
        username: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email to be used',
            demandOption: true,
            type: 'string'
        },
        password: {
            describe: 'Password of the new account',
            demandOption: true,
            type: 'string',
        },
        confirmPassword: {
            describe: 'Confirm the password of the new account',
            demandOption: true,
            type: 'string',
        },
        firstName: {
            describe: 'First name of the new account',
            demandOption: true,
            type: 'string',
        },
        lastName: {
            describe: 'Last name of the new account',
            demandOption: true,
            type: 'string',
        },
        bio: {
            describe: 'Biography of the new account',
            demandOption: true,
            type: 'string',
        },
        website: {
            describe: 'Website of the new account',
            demandOption: true,
            type: 'string',
        },
        location: {
            describe: 'Location of the new account',
            demandOption: true,
            type: 'string',
        },
        picture: {
            describe: 'Picture of the new account',
            demandOption: true,
            type: 'string',
        },
        birthday:{
            describe: 'User birthday',
            type: 'string'
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        signUp(argv)
    }
})

// create login command

y.command({
    command: 'login',
    describe: 'login with an account',
    builder: {
        username: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
        password: {
            describe: 'Password of the account',
            
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        login(argv)
    }
})

// create guest account command

y.command({
    command: 'guest-user',
    describe: 'Creates a guest account ',
    builder: {
        username: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },

       picture: {
           describe: 'A profile picture',
            demandOption: false,
            type: 'string'
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        guestSignUp(argv)
    }
})

// Logout user

y.command({
    command: 'logout',
    describe: 'Logout current account ',
    builder: {
        username: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
        
    },
    handler(argv) {
        logOut(argv)
    }
})

// recover the account

y.command({
    command: 'recover',
    describe: 'recover the current account ',
    builder: {
        username: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },

        newPassword: {
            describe: 'The new password of the account',
            demandOption: true,
            type: 'string'
        },
        confirmPassword: {
            describe: 'confirm the current password',
            demandOption: true,
            type: 'string'
        },  
    },
    handler(argv) {
        recover(argv)
    }
})

// delete an account 

y.command({
    command: 'delete',
    describe: 'This can only be done by the logged in user',
    builder: {
        username: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        deleteuser(argv)
    }
})

// get user by username

y.command({
    command: 'get-user',
    describe: 'get an user by username',
    builder: {
        username: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        getUser(argv)
    }
})

// update account

y.command({
    command: 'update-user',
    describe: 'update & existen account',
    builder: {
        username: {
            describe: 'and username',
            demandOption: true,
            type: 'string'
        },
        firstName: {
            describe: 'your frist name',
            demandOption: true,
            type: 'string'
        },
        lastName: {
            describe: 'your lastname',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'your email',
            demandOption: true,
            type: 'string'
        },
        bio: {
            describe: 'your biogaphy',
            demandOption: true,
            type: 'string'
        },
        website: {
            describe: '...',
            demandOption: true,
            type: 'string'
        },
        location: {
            describe: 'your actual location',
            demandOption: true,
            type: 'string'
        },
        picture: {
            describe: '...',
            demandOption: true,
            type: 'string'
        },Birthday:{
            describe: 'User birthday',
            type: 'string'
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        updateUser(argv)
    }
})

//get post command

y.command({
    command: 'get-post',
    describe: 'gets a post',
    builder: {
        postid: {
            describe: 'Post to get',
            demandOption: true,
            type: 'string'
        },
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        getPost(argv)
    }
})
// Create a post command

y.command({
    command: 'post',
    describe: 'creates a post ',
    builder: {
        post: {
            describe: 'Post name',
            demandOption: true,
            type: 'string'
        },
        canLike: {
            describe: 'Possibility to like',
            demandOption: true,
            type: 'bool'
        },
       canUnlike: {
           describe: 'Possibility to unlike',
            demandOption: true,
            type: 'bool'
        },
        tag: {
            describe: 'Tag',
            demandOption: true,
            type: 'string'
        },
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        createPost(argv)
    }
})
//update post command

y.command({
    command: 'update-post',
    describe: 'updates a post',
    builder: {
        postId: {
            describe: 'Post ID',
            demandOption: true,
            type: 'string'
        },
        canLike: {
            describe: 'Possibility to like',
            demandOption: true,
            type: 'bool'
        },
       canUnlike: {
           describe: 'Possibility to unlike',
            demandOption: true,
            type: 'bool'
        },

        tag: {
            describe: 'Tag',
            demandOption: true,
            type: 'string'
        },

        // TODO: prompt to confirm the password
    },
    handler(argv) {
        updatePost(argv)
    }
})

// Delete post

y.command({
    command: 'delete-post',
    describe: 'deletes a post',
    builder: {
        postId: {
            describe: 'Post name',
            demandOption: true,
            type: 'string'
        },

    },
    handler(argv) {
        deletePost(argv)
    }
})

// View comment

y.command({
    command: 'view-comment',
    describe: 'view a comment',
    builder: {
        postid: {
            describe: 'Post ID',
            demandOption: true,
            type: 'string'
        },

    },
    handler(argv) {
        viewComment(argv)
    }
})

// Create comment

y.command({
    command: 'create-comment',
    describe: 'create a comment',
    builder: {
        comment: {
            describe: 'Comment to create',
            demandOption: true,
            type: 'string'
        },
        postid: {
            describe: 'Post ID',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        createComment(argv)
    }
})

// add a friend 
y.command({
    command: 'add-friend',
    describe: 'add a friend ',
    builder: {
        username: {
            describe: 'Username of the friend',
            demandOption: true,
            type: 'string'
        },
        userId: {
            describe: 'UserId of the friend',
            demandOption: true,
            type: 'string'
            
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        addafriend(argv)
    }
})

// delete a friend 
y.command({
    command: 'delete-friend',
    describe: 'delete a friend ',
    builder: {
        username: {
            describe: 'Username of the friend to delete',
            demandOption: true,
            type: 'string'
        },
        userId: {
            describe: 'UserId of the friend to delete',
            demandOption: true,
            type: 'string'
            
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        deleteafriend(argv)
    }
})

// block a friend 
y.command({
    command: 'block-friend',
    describe: 'block a friend ',
    builder: {
        username: {
            describe: 'Username of the friend to block',
            demandOption: true,
            type: 'string'
        },
        userId: {
            describe: 'UserId of the friend to block',
            demandOption: true,
            type: 'string'
            
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        blockeafriend(argv)
    }
})

// friend list 
y.command({
    command: 'all-friend',
    describe: 'list of all your friends ',
    builder: {
        username: {
            describe: 'Usernames of your friends',
            demandOption: true,
            type: 'array'
        },
        userId: {
            describe: 'UserIds of your friends',
            demandOption: true,
            type: 'array'
            
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        listoffriend(argv)
    }
})

// Create a group of friends
y.command({
    command: 'create-group',
    describe: 'create a group ',
    builder: {
        username: {
            describe: 'string',
            demandOption: true,
            type: 'string'
        },
        friendId: {
            describe: 'friendId',
            demandOption: true,
            type: 'string'
            
        },
        friend: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        },
        groupId: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        },
        name: {
            describe: 'Name of the group',
            demandOption: true,
            type: 'string'
            
        },
        createdAt: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        },
        updatedAt: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        }
    },
    handler(argv) {
        createGroup(argv)
    }
})

// Edit a group of friends
y.command({
    command: 'edit-group',
    describe: 'edit a group ',
    builder: {
  
        groupId: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        },
        name: {
            describe: 'Name of the group',
            demandOption: true,
            type: 'string'
            
        },
        createdAt: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        },
        updatedAt: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        }
    },
    handler(argv) {
        editGroup(argv)
    }
})

// Delete a group of friends
y.command({
    command: 'delete-group',
    describe: 'delete a group ',
    builder: {
        
        groupId: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        },
        name: {
            describe: 'Name of the group',
            demandOption: true,
            type: 'string'
            
        }
    },
    handler(argv) {
        deleteGroup(argv)
    }
})

// View a list of friends group
y.command({
    command: 'view-groups',
    describe: 'View a list of friends group',
    builder: {
        name: {
            describe: 'Name of the group',
            demandOption: true,
            type: 'string'
            
        },
        username: {
            describe: 'string',
            demandOption: true,
            type: 'string'
        },
  
        friend: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        },
        groupId: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        },

        updatedAt: {
            describe: 'string',
            demandOption: true,
            type: 'string'
            
        }
    },
    handler(argv) {
        listGroup(argv)
    }
})

y.parse(process.argv.slice(2))

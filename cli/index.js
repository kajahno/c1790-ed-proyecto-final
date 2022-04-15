import chalk from 'chalk';
import boxen from 'boxen';
import yargs from 'yargs';
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

    const { email, password, username } = args;

    const newUserData = {
        email,
        password,
        confirmPassword: password,
        username,
        Birthday,
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
const guest= (args) => {

    const { userId, picture, username } = args;

    const guestuserdata= {
        userId,
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
const logOut= (args) => {

    const {  } = args;

    console.log(chalk.yellow.bold("Logging out..."));

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

    const { username, userId, email, newPassword, confirmPassword } = args;

    const recoverUserData = {
        username,
        userId,
        email,
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
        .delete("/user/{username}", deleteUserData)
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
const getuser = (args) => {

    console.log(chalk.yellow.bold("getting user..."));

    const { username } = args;
    
        const getUserData = {
            username
        };

    axios
        .get("/user/{username}", getUserData)
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
const updateuser = (args) => {

    const { userId, password, confirmPassword, username, firstName, 
    lastName, email, bio, website, location, picture } = args;

    const updateUserData = {
        userId,
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
        Birthday
    };

    console.log(chalk.yellow.bold("updating..."));

    axios
        .put("/user/{username}", updateUserData)
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
const getpost = (args) => {

    console.log(chalk.yellow.bold("getting post..."));

    const { post } = args;
    
        const getPostData = {
            post
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

    const { post, canLike, canUnlike, likes, tag } = args;

    const putPostData = {
        post,
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

    const {  } = args;

    const deleteCo = {
        post,
        canLike,
        canUnlike,
        likes,
        tag
    };

    console.log(chalk.yellow.bold("deleting..."));

    axios
        .post("/posts", deleteCo)
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

    const {  } = args;

    console.log(chalk.yellow.bold("View comment..."));

    axios
        .post("/posts/comments")
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

    const {  } = args;

    console.log(chalk.yellow.bold("deleting..."));

    axios
        .post("/posts/comments")
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
            describe: 'Password of the new account'
        },
        Birthday:{
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
y.scriptName("connectme")
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
            describe: 'Password of the account'
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        login(argv)
    }
})

// create guest account command
y.scriptName("connectme")
y.command({
    command: 'guest',
    describe: 'Creates a guest account ',
    builder: {
        username: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
        userID: {
            describe: 'An user ID',
            demandOption: true,
            type: 'string'
        },
       picture: {
           describe: 'A profile picture',
            demandOption: true,
            type: 'string'
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        guest(argv)
    }
})

// Logout user
y.scriptName("connectme")
y.command({
    command: 'logout',
    describe: 'Logout current account ',
    builder: {
        username: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
        userID: {
            describe: 'An user ID',
            demandOption: true,
            type: 'string'
        },
        
    },
    handler(argv) {
        logOut(argv)
    }
})

// recover the account
y.scriptName("connectme")
y.command({
    command: 'recover',
    describe: 'recover the current account ',
    builder: {
        username: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
        userID: {
            describe: 'An user ID',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'An user email',
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
y.scriptName("connectme")
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
y.scriptName("connectme")
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
        getuser(argv)
    }
})

// update account
y.scriptName("connectme")
y.command({
    command: 'update-user',
    describe: 'update & existen account',
    builder: {
        userId: {
            describe: 'and userID',
            demandOption: true,
            type: 'string'
        },
        password: {
            describe: 'password of the account',
            demandOption: true,
            type: 'string'
        },
        confirmPassword: {
            describe: 'confirm the password',
            demandOption: true,
            type: 'string'
        },
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
        updateuser(argv)
    }
})

//get post command
y.scriptName("connectme")
y.command({
    command: 'get-post',
    describe: 'gets a post',
    builder: {
        post: {
            describe: 'Post to get',
            demandOption: true,
            type: 'string'
        },
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        getpost(argv)
    }
})
//Post command
y.scriptName("connectme")
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
        likes: {
            describe: 'Ammount of likes',
            demandOption: true,
            type: 'int'
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
y.scriptName("connectme")
y.command({
    command: 'update-post',
    describe: 'updates a post',
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
        likes: {
            describe: 'Ammount of likes',
            demandOption: true,
            type: 'int'
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
y.scriptName("connectme")
y.command({
    command: 'delete-post',
    describe: 'deletes a post',
    builder: {
        post: {
            describe: 'Post name',
            demandOption: true,
            type: 'string'
        },
        canLike: {
            describe: 'Not possibility to like',
            demandOption: true,
            type: 'bool'
        },
       canUnlike: {
           describe: 'Not possibility to unlike',
            demandOption: true,
            type: 'bool'
        },
        likes: {
            describe: 'Ammount of likes',
            demandOption: true,
            type: 'int'
        },
        tag: {
            describe: 'Tag',
            demandOption: true,
            type: 'string'
        },

    },
    handler(argv) {
        deletePost(argv)
    }
})

// View comment
y.scriptName("connectme")
y.command({
    command: 'view-comment',
    describe: 'view a comment',
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
        likes: {
            describe: 'Ammount of likes',
            demandOption: true,
            type: 'int'
        },
        tag: {
            describe: 'Tag',
            demandOption: true,
            type: 'string'
        },

    },
    handler(argv) {
        viewComment(argv)
    }
})

// Create comment
y.scriptName("connectme")
y.command({
    command: 'create-comment',
    describe: 'create a comment',
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
        likes: {
            describe: 'Ammount of likes',
            demandOption: true,
            type: 'int'
        },
        tag: {
            describe: 'Tag',
            demandOption: true,
            type: 'string'
        },

    },
    handler(argv) {
        createComment(argv)
    }
})

y.parse(process.argv.slice(2))

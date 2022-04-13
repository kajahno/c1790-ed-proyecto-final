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

// ==> authentication

//*signup
const signUp = (args) => {

    const { email, password, username } = args;

    const newUserData = {
        email,
        password,
        confirmPassword: password,
        username,
    };

    console.log(chalk.white.bold("Creating a new account..."));

    axios
        .post("/user", newUserData)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.white.bold("Account created successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not create account -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
        });
}

//* Login 
const login = (args) => {

    const { password, username } = args;

    const useUserData = {
        password,
        username,
    };

    console.log(chalk.bgBlue.bold("login..."));

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

// *definition of create guest command
const guest= (args) => {

    const { userId, picture, username } = args;

    const guestuserdata= {
        userID,
        picture,
        username,
    };

    console.log(chalk.white.bold("Creating a guest account..."));

    axios
        .post("/user/guest", guestuserdata)
        .then((res) => {
            console.log(res.data);

            const FBIdToken = `Bearer ${res.data.token}`;
            // TODO: create a file in the user's machine to store the auth token
            console.log(chalk.white.bold("user guest created successfully ✔️"));
        })
        .catch((error) => {
            console.log(chalk.red.bold(`Could not create aguest account -> code: ${error.response.statusText}, message: ${JSON.stringify(error.response.data)}`));
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

    console.log(chalk.bgBlue.bold("login..."));

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
        }
        // TODO: prompt to confirm the password
    },
    handler(argv) {
        signUp(argv)
    }
})

// create login command
y.scriptName("connectme")
y.usage("Usage: -n <name>");
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
y.usage("Usage: -n <name>");
y.command({
    command: 'guest',
    describe: 'Creata a guest account ',
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


y.parse(process.argv.slice(2))

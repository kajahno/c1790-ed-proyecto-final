import React, { Component } from "react";
import AppIcon from "../logo.svg";
import axios from "axios";

import {
    Grid,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@mui/material";

import {
    withStyles,
} from "@mui/styles";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

const styles = {
    form: {
        textAlign: "center",
    },
    image: {
        margin: "20px auto 20px auto",
        height: "80px",
    },
    pageTitle: {
        margin: "10px auto 10px auto",
    },
    textField: {
        margin: "10px auto 10px auto",
    },
    button: {
        marginTop: 20,
        height: "40px",
        position: "relative",
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10,
    },
    signUpText: {
        marginTop: 10,
    },
    progress: {
        position: "absolute",
    },
};

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false,
            errors: {},
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });

        const { username, password } = this.state;

        const userData = {
            username,
            password,
        };
        
        //Denny Bryant De la Rosa Suarez 10139393
        // TODO: implement creating the user here using axios

        axios.post("user/login", userData, {
            username: this.state.username,
            password: this.state.password

        })
            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            })

    };


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const {
            classes
        } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img
                        src={AppIcon}
                        alt="ConnectMe app logo"
                        className={classes.image}
                    />
                    <Typography
                        variant="h2"
                        className={classes.pageTitle}
                    >
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="username"
                            name="username"
                            typeof="text"
                            label="Username"
                            helperText={errors.username}
                            error={errors.username ? true : false}
                            className={classes.textField}
                            value={this.state.username}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            typeof="password"
                            label="Password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography
                                variant="body2"
                                className={classes.customError}
                            >
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={this.state.loading}
                        >
                            {this.state.loading ? (
                                <CircularProgress
                                    size={30}
                                    className={classes.progress}
                                />
                            ) : (
                                "Login"
                            )}
                        </Button>
                        <Typography
                            variant="body2"
                            className={classes.signUpText}
                        >
                            don't have an account? sign up{" "}
                            <Typography
                                color="primary"
                                component={Link}
                                to="/signup"
                            >
                                here
                            </Typography>
                        </Typography>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(login);

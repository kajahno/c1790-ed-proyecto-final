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
            email: "",
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

        const { email, password } = this.state;

        const params = {
            email,
            password
        };

        //Denny Bryant De la Rosa Suarez 10139393
        // TODO: implement creating the user here using axios

        axios
            .post("/user/login", null, { params })
            .then((res) => {
                console.log(res.data);

                const FBIdToken = `Bearer ${res.data.token}`;
                localStorage.setItem("FBIdToken", FBIdToken);
                axios.defaults.headers.common["Authorization"] = FBIdToken;
                this.props.history.push("/");

                // Clear state 
                this.setState({
                    loading: false,
                    errors: {}
                });
            })
            .catch((error) => {

                console.log("there were errors: ", error);

                this.setState({
                    loading: false,
                    errors: {
                        ...this.state.errors,
                        general: error.message
                    }
                });
            });
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
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
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

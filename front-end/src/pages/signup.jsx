import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import AppIcon from "../logo.svg";
import {
    Grid,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@mui/material";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

import axios from "axios";

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
//  Denny 
class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            birthday: "",
            location: "",
            password: "",
            confirmPassword: "",
            username: "",
            bio: "",
            website: "",
            errors: {},
            loading: false,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { firstname, lastname, bio, location, email, birthday, password, confirmPassword, username, website } = this.state;

        const newUserData = {
            firstname,
            lastname,
            email,
            birthday,
            location,
            password,
            confirmPassword,
            username,
            bio,
            website

        };


        this.setState({
            loading: true,
        });

        axios
            .post("/user", newUserData)
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
            classes,
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
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <textField
                            id="firstname"
                            name="firstname"
                            type="firstname"
                            label="Firstname"
                            helperText={errors.firstname}
                            error={errors.firstname ? true : false}
                            className={classes.textField}
                            value={this.state.firstname}
                            onchange={this.handleChange}
                            fullWidth
                        />
                        <textField
                            id="lastname"
                            name="lastname"
                            type="lastname"
                            label="Lastname"
                            helperText={errors.lastname}
                            error={errors.lastname ? true : false}
                            className={classes.textField}
                            value={this.state.lastname}
                            onchange={this.handleChange}
                            fullWidth
                        />
                        <textField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.textField}
                            value={this.state.email}
                            onchange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="birthday"
                            name="birthday"
                            type="birthday"
                            label="Birthday"
                            helperText={errors.birthday}
                            error={errors.birthday ? true : false}
                            className={classes.TextField}
                            value={this.state.birthday}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <textField
                            id="location"
                            name="location"
                            type="location"
                            label="Location"
                            helperText={errors.location}
                            error={errors.location ? true : false}
                            className={classes.textField}
                            value={this.state.location}
                            onchange={this.handleChange}
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
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="username"
                            name="username"
                            type="text"
                            label="Username"
                            helperText={errors.username}
                            error={errors.username ? true : false}
                            className={classes.textField}
                            value={this.state.username}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="bio"
                            name="bio"
                            type="bio"
                            label="Bio"
                            helperText={errors.bio}
                            error={errors.email ? true : false}
                            className={classes.textField}
                            value={this.state.bio}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="website"
                            name="website"
                            type="website"
                            label="Website"
                            helperText={errors.website}
                            error={errors.website ? true : false}
                            className={classes.textField}
                            value={this.state.website}
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
                                "Register"
                            )}
                        </Button>
                        <Typography
                            variant="body2"
                            className={classes.signUpText}
                        >
                            already have an account? login{" "}
                            <Typography
                                color="primary"
                                component={Link}
                                to="/login"
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

export default withStyles(styles)(signup);

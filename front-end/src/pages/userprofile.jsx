//Anthony's Work
//El user profile solo funciona con el SignUp
//Al dar SignUp, luego hay que dar un refresh a la pagina y aparecera loggeado
//Ojo en la base de datos no se esta guardando el firstname y el lastname pero si se ingresa el valor desde de la base de datos aparecera en user profile

import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import AppIcon from "../logo.svg";
import {
    Grid,

    CircularProgress,

    Typography,
} from "@mui/material";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

import axios from "axios";

const styles = {
    form: {
        textAlign: "center",
    },
    pageTitle: {
        margin: "10px auto 10px auto",
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10,
    },
    userprofileText: {
        marginTop: 10,
    },
    progress: {
        position: "absolute",
    },
};

const signup = props => (
    <tr>
        <td>{props.signup.Birthday}</td>
        <td>{props.signup.email}</td>
        <td>{props.signup.username}</td>
    </tr>
)

class userprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                birthday: "",
                userName: "",
                bio: "",
                firstName: "",
                lastName: "",
                lastSeen: "",
                userId: "",
                website: "",
                location:"",
            },
            loading: false
        };
    }

    componentDidMount() {

        // this.setState({
        //     usermame: localStorage.username
        // })

        // const { username } = this.state;

        const username = localStorage.username;

        // TODO: set loading to true

        axios.get(`/user/${username}`)
            .then(response => {
                //console.log(this.state.todos);
                console.log("response", response.data);
                this.setState({ user: response.data });
                //console.log(this.state.todos);
            })
            .catch(function (error) {
                console.log(error);
            })

        // TODO: set loading to false
    }

    render() {
        const {
            classes,
        } = this.props;
        const { errors } = this.state;

        const { user } = this.state;

        const fullName = `${user.firstName} ${user.lastName}`

        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img src="https://i.postimg.cc/m265JY1k/l60Hf.png"></img>
                    <Typography variant="h3" className={classes.pageTitle}>
                        {fullName}
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        {
                            <center>
                                <table>
                                    <tr>
                                        <center>
                                            <th>Location: </th>
                                            <td>{user.location}</td>
                                        </center>
                                    </tr>
                                    <tr>
                                        <center>
                                            <th>Bio: </th>
                                            <td>{user.bio} </td>
                                            <center>
                                                <th>Web: </th>
                                                <td>{user.website} </td>
                                            </center>
                                            <center>
                                                <th>lastseen: </th>
                                                <td> {user.lastSeen}</td>
                                                <center>
                                                <th>Userid: </th>
                                                <td> {user.userId}</td>
                                                </center>
                                            </center>
                                        </center>

                                    </tr>
                                </table>
                            </center>

                        }</form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(userprofile);
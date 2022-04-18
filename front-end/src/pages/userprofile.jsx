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

class  userprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            Birthday:"",
            username: "",
        };
    }

    componentDidMount() {
      axios.get('https://europe-west2-c1790-ed-proyecto-final.cloudfunctions.net/api')
          .then(response => {
              //console.log(this.state.todos);
              this.setState({ signup: response.data.data });
              //console.log(this.state.todos);
          })
          .catch(function (error) {
              console.log(error);
          })
  }

    render() {
        const {
            classes,
        } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img src="https://www.example.com/images/dinosaur.jpg"></img>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Anthony Ferreras
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        {
                        <center>
                        <table>
                    <tr>
                    <center>
                     <th>Location: </th>
                     <td>Santo Domingo, Dominican Republic</td>
                     </center>
                     </tr>
                      <tr>
                      <center>
                      <th>Bio: </th>
                     <td>No se programar :c </td>
                     <center>
                     <th>Web: </th>
                     <td>AnthonyF.com </td>
                     </center>
                     <center>
                     <th>Fecha de registro: </th>
                     <td> 07/04/2022</td>
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

import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import { Grid, Item, CircularProgress, Typography, formLabelClasses, Avatar, TextField, Paper } from '@mui/material';
import {
    withStyles,
} from "@mui/styles";
import { ClassNames } from '@emotion/react';
import AppIcon from "../logo.svg";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { typographyVariant } from '@mui/system';
import { Container } from '@mui/material';
import PostForm from '../components/layout/Homepage-systems/PostForm';
import Post from '../components/layout/Homepage-systems/Post';
import Posts from '../components/layout/Homepage-systems/Posts';
import App from './PostSystem';
import PostSystem from './PostSystem';
import login from './login';
import userprofile from "./userprofile";

//Andy's Work
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
    homeBody: {
        display:"flex",
        justifyContent:"center",
      }
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: false,
            errors: {},

        }
    }

    render() {

        <Container maxWidth="sm">

        </Container>
        const {
            classes
        } = this.props;
        const { errors } = this.state;

        let listOfPostsMarkup = this.state.posts.length >= 0 ? (
            this.state.posts.map((post) => {
                return <Post key={post.id} post={post} />
            })
        ) : <React.Fragment />;

        <Container maxWidth="sm">
            <PostSystem></PostSystem>
        </Container>

        return <Grid container className={classes.form}>
            <Grid
  container
  direction="row"
  justifyContent="space-between"
  alignItems="center"
>
            <Grid item sm >

<PostSystem/>

                </Grid>

            <Grid item xs></Grid>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                Login  /
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/signup"
                            >
                              /  Signup
                            </Button>

                            <Grid item xs >
                            <Paper elevation={3}/>
                            <Typography>
                                <h2> /Username </h2>
                            </Typography>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/userprofile"
                            >
                             <h2> User profile </h2>
                            </Button>
                            <Button

                            color="inherit"
                            component={Link}
                            to= "<Logout> </Logout>"
>
                            <h3>Logout </h3>
                            </Button>


 
                            </Grid>



    
        </Grid>
        </Grid>
    }
}


export default withStyles(styles)(Home);

import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import { Grid, Item, CircularProgress, Typography, formLabelClasses, Avatar, TextField } from '@mui/material';
import {
    withStyles,
} from "@mui/styles";
import { ClassNames } from '@emotion/react';
import AppIcon from "../logo.svg";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { typographyVariant } from '@mui/system';

//Andy's Work
import { Post } from '../components/layout/Homepage-systems/Post';
import CommentForm from '../components/layout/Homepage-systems/CommentForm';


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
        const {
            classes
        } = this.props;
        const { errors } = this.state;

        let listOfPostsMarkup = this.state.posts.length >= 0 ? (
            this.state.posts.map((post) => {
                return <Post key={post.id} post={post} />
            })
        ) : <React.Fragment />;

        return <Grid container className={classes.form}>
            <Grid item xs>
                <form noValidate autoComplete="off">
                <TextField 
                Label="How are you feeling today?"
                variant="outlined"
                color="secondary"
                fullWidth


                />
                </form>
         
                </Grid>

            <Grid item xs></Grid>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                Login  /
                            </Button>
                            <Grid item>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/signup"
                            >
                              /  Signup
                            </Button>
                            </Grid>



    
        </Grid>
    }
}


export default withStyles(styles)(Home);

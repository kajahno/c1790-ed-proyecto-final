import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";


// MUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";


//Icons
import HomeIcon from "@mui/icons-material/Home";


export class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            {/* TODO: create a post component and call it here */}
                            <Link to="/">
                                <Button tip="Home">
                                    <HomeIcon />
                                </Button>
                            </Link>
                            {/* TODO: create a notifications component and call it here */}
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/">
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/signup"
                            >
                                Signup
                            </Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;

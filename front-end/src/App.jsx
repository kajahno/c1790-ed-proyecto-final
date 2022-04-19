import  "./App.css";

import axios from "axios";
import jwtDecode from "jwt-decode";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";

import { orange, green } from '@mui/material/colors';

import Navbar from "./components/layout/Navbar";

import login from "./pages/login";
import signup from "./pages/signup";
import React from "react";
import home from "./pages/home";
import userprofile from "./pages/userprofile";
const theme = createTheme({
  palette: {
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700],
      contrastText: "#fff",
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700],
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

// URLS:
// Production -> https://europe-west2-c1790-ed-proyecto-final.cloudfunctions.net/api
// Local development -> http://localhost:5001/c1790-ed-proyecto-final/europe-west2/api
axios.defaults.baseURL =
  "https://europe-west2-c1790-ed-proyecto-final.cloudfunctions.net/api";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  componentDidMount(){
    // Check if the user is already logged in
    const token = localStorage.FBIdToken; // Get this from browser developer tools > Storage > Local Storage
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        this.setState({
          authenticated: false
        }); // token expired
      } else {
        console.log("found valid authentication token");        
        this.setState({
          authenticated: true
        }); // token is valid
        axios.defaults.headers.common["Authorization"] = token;
      }
    }
  }  

  render() {

    const { authenticated } = this.state; 

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar authenticated={authenticated} />
          <div className="container">
            <Switch>
              <Route exact path="/" authenticated={authenticated} component={home}  />
              {!authenticated && <Route exact path="/login" component={login} />}
              {!authenticated && <Route exact path="/signup" component={signup} />}   
              {!authenticated && <Route exact path="/userprofile" component={userprofile} />}           
              {/* <Route
                exact
                path="/users/:username"
              /> */}
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;

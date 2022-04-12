import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../src/TopMenu';
import SideMenu from '../src/SideMenu';
import Footer from '../src/layout/Home ui/Footer';
import MainContent from '../src/MainContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Home;
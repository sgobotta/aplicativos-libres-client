import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { logOut, toggleDrawer } from 'actions';
import SocialAuth from 'components/authentication/SocialAuth';


const styles = {
  root: {
    flexGrow: 1,
  },
  menuItem: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component {
  handleClickLogout = e => {
    e.preventDefault();

    this.props.dispatch(logOut());
  };

  handleDrawerClick = (e) => {
    e.preventDefault();
    this.props.dispatch(toggleDrawer());
  }

  handleAuthenticate = (e) => {
    e.preventDefault();
    const user = {
      id: '5b9dce6000e01d049c20fe5e',
      email: 'santiago@camba.coop',
    };
  }

  renderAnotherFacebookButton() {
    return (
      <SocialAuth />
    );
  }

  renderFacebookButton() {
    const { classes } = this.props;
    return (
      <Typography align="left" variant="title" color="inherit" className={classes.menuItem}>
        <a href="#" onClick={this.handleAuthenticate} style={{ color: 'white' }} className="button">Login With Facebook</a>
      </Typography>
    );
  }

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: 'rgb(30, 120, 235)' }}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleDrawerClick}>
              <MenuIcon />
            </IconButton>
            <Typography align="left" variant="title" color="inherit" className={classes.menuItem}>
              <Link to="/">
                <Button>Portada</Button>
              </Link>
            </Typography>
            { !user.isAuthenticated &&
              <Typography align="right" variant="title" color="inherit" className={classes.menuItem}>
                <Link to="/login">
                  <Button>Ingresar</Button>
                </Link>
              </Typography>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  user: PropTypes.object,
};

export default withStyles(styles)(ButtonAppBar);

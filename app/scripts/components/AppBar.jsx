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


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
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

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            { user.isAuthenticated &&
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleDrawerClick}>
                <MenuIcon />
              </IconButton>
            }
            <Typography align="left" variant="title" color="inherit" className={classes.flex}>
              <Link to="/">
                <Button>Home</Button>
              </Link>
            </Typography>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to="/map">
                <Button>Maps</Button>
              </Link>
            </Typography>
            { !user.isAuthenticated &&
              <Typography align="right" variant="title" color="inherit" className={classes.flex}>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </Typography>
            }
            { user.isAuthenticated &&
              <Typography align="right" variant="title" color="inherit" className={classes.flex}>
                <Button onClick={this.handleClickLogout}>Logout</Button>
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

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
import { login, logOut } from 'actions';

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

  handleClickLogin = (e) => {
    e.preventDefault();

    this.props.dispatch(login());
  };

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to="/">
                <Button>Home</Button>
              </Link>
            </Typography>
            <Link to="/map">
              <Button>Map</Button>
            </Link>
            { !user.isAuthenticated &&
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            }
            { user.isAuthenticated &&
              <Button onClick={this.handleClickLogout}>Logout</Button>
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

//
// <header className="">
//   <div className="app__container">
//     <div className="app__header__menu">
//       <ul className="list-unstyled">
//         <li>
//           <Link
//             to="/map"
//             className="btn btn-md btn-primary btn-icon"
//           >
//             <i className="i-map" /><span>map</span>
//           </Link>
//         </li>
//         <li>
//           { user.isAuthenticated &&
//             <a
//               href="#logout"
//               className="btn btn-md btn-primary btn-icon app__logout"
//               onClick={this.handleClickLogout}
//             >
//               <span>logout</span><i className="i-sign-out" />
//             </a>
//           }
//           { !user.isAuthenticated &&
//             <Link
//               to="/login"
//               className={cx('btn btn-md btn-primary btn-icon app__logout', {
//                 'btn-loading': user.status === 'running',
//               })}
//             >
//               <span>login</span><i className="i-sign-in" />
//             </Link>
//           }
//         </li>
//       </ul>
//     </div>
//   </div>
// </header>
//

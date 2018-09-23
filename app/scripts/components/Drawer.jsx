/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { toggleDrawer, logOut } from 'actions';
/** Material UI Imports */
import classNames from 'classnames';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SettingsIcon from '@material-ui/icons/SettingsSharp';
import Restaurant from '@material-ui/icons/Restaurant';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Assessment from '@material-ui/icons/Assessment';
import EventIcon from '@material-ui/icons/Event';


const drawerTheme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        paddingTop: '0px',
        paddingBottom: '0px',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: 'rgb(180, 205, 231)',
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
        border: '1px solid rgb(0, 120, 170)',
        borderLeft: '0px',
      },
    },
  },
});

const styles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
};

class SwipeableTemporaryDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.drawer.isActive,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isActive: nextProps.drawer.isActive,
    });
  }

  handleClickLogout = () => {
    this.props.dispatch(logOut());
  };

  toggleDrawer = () => () => {
    this.props.dispatch(toggleDrawer());
  };

  goToRoute = (path) => () => {
    this.props.dispatch(toggleDrawer({ redirectsTo: () => this.props.history.push(path) }));
  }

  renderStatistics() {
    return (
      <ListItem button onClick={this.goToRoute('/statistics')}>
        <ListItemIcon>
          <IconButton>
            <Assessment />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Estadísticas" />
      </ListItem>
    );
  }

  renderEvents() {
    return (
      <ListItem button onClick={this.goToRoute('/events')}>
        <ListItemIcon>
          <IconButton>
            <EventIcon />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Eventos" />
      </ListItem>
    );
  }

  renderOrders() {
    const { user } = this.props;
    if (user.isAuthenticated) {
      return (
        <ListItem button onClick={this.goToRoute('/orders')}>
          <ListItemIcon>
            <IconButton>
              <Restaurant />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Pedidos" />
        </ListItem>
      );
    }
    return null;
  }

  renderSettings() {
    const { user } = this.props;
    if (user.isAuthenticated) {
      return (
        <ListItem button onClick={this.goToRoute('/settings')}>
          <ListItemIcon>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Configuraciones" />
        </ListItem>
      );
    }
    return null;
  }

  renderLogout() {
    const { user } = this.props;
    if (user.isAuthenticated) {
      return (
        <ListItem button onClick={this.handleClickLogout}>
          <ListItemIcon>
            <IconButton>
              <PowerSettingsNew />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      );
    }
    return null;
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={drawerTheme}>
        <SwipeableDrawer
          classes={{ paper: classNames(classes.drawerPaper) }}
          anchor="left"
          open={this.state.isActive}
          onClose={this.toggleDrawer('isActive', false)}
          onOpen={this.toggleDrawer('isActive', true)}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.toggleDrawer()}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List disablePadding={true}>
            { this.renderStatistics() }
            { this.renderEvents() }
            <Divider />
            { this.renderOrders() }
            { this.renderSettings() }
            { this.renderLogout() }
          </List>
          <Divider />
        </SwipeableDrawer>
      </MuiThemeProvider>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  drawer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);

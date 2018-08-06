/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { toggleDrawer } from 'actions';
/** Material UI Imports */
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
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

  toggleDrawer = () => () => {
    this.props.dispatch(toggleDrawer());
  };

  goToRoute = (path) => () => {
    this.props.dispatch(toggleDrawer({ redirectsTo: () => this.props.history.push(path) }));
  }

  renderOrders() {
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

  renderSettings() {
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

  render() {
    const { classes } = this.props;

    return (
      <div>
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
          <List>
            { this.renderOrders() }
            <Divider />
            { this.renderSettings() }
          </List>
          <Divider />
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  drawer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);

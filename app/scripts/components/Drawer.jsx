import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { toggleDrawer } from 'actions';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mailFolderListItems, otherMailFolderListItems } from './drawerData';


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
      isActive: props.isActive,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isActive: nextProps.isActive,
    });
  }

  toggleDrawer = () => () => {
    this.props.dispatch(toggleDrawer());
  };

  render() {
    const { classes } = this.props;

    // const mailFolderListItems = [1, 2, 3, 4];
    // const otherMailFolderListItems = ['a', 'b', 'c', 'd'];

    // const sideList = (
    //   <div className={classes.list}>
    //     <List>{mailFolderListItems}</List>
    //     <Divider />
    //     <List>{otherMailFolderListItems}</List>
    //   </div>
    // );
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
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

// <div
//   tabIndex={0}
//   role="button"
//   onClick={this.toggleDrawer('isActive', false)}
//   onKeyDown={this.toggleDrawer('isActive', false)}
// >
//   {sideList}
// </div>

export default withStyles(styles)(SwipeableTemporaryDrawer);

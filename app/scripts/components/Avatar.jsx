import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = {
  orangeAvatar: {
    margin: 2,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 2,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
};

function LetterAvatars(props) {
  const { classes, initials } = props;
  return (
    <Avatar className={classes.purpleAvatar}>{initials}</Avatar>
  );
}

LetterAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
  initials: PropTypes.string.isRequired,
};

export default withStyles(styles)(LetterAvatars);

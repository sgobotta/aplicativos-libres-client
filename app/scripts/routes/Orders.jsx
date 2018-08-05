/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 680,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center',
  },
  body: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    minWidth: '100%',
    borderRadius: '3px',
  },
});


class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.body}>
        <Paper className={classes.root}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm container>
              <Grid
                item
                container
                direction="column"
                spacing={16}
              >
                <Grid item xs={1}>
                  <ShoppingCart />
                </Grid>
                <Grid item xs={11}>
                  <Typography gutterBottom variant="headline">
                    Pedidos de les pi'
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(withStyles(styles)(Orders));

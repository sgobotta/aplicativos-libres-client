/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
import { findOrders } from 'actions';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
/** Miscellaneous Imports */
import { DateUtils } from 'utils';

const styles = {
  mainCard: {
    minWidth: '100%',
    borderRadius: '3px',
  },
  itemCard: {
    padding: '12px 12px 12px 12px',
    borderRadius: '0px',
  },
  cardIcon: {
    color: 'red',
  },
  username: {
    fontWeight: 'bold',
  },
  creationDate: {
    fontStyle: 'italic',
  },
};

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(findOrders());
  }


  /**
   * Render Methods
   * */

  renderUsername(author) {
    const { user, classes } = this.props;
    if (author.id === user.data.id) {
      return (
        <span className={classes.username}>Yo</span>
      );
    }
    return author.username;
  }

  renderCreationDate(creationDate) {
    const { classes } = this.props;
    const date = DateUtils.getElapsedTime(creationDate);
    return (
      <span className={classes.creationDate}>{date}</span>
    );
  }

  renderDeleteAction(authorId) {
    const { classes, user } = this.props;
    if (authorId === user.data.id) {
      return (
        <Button
          size="small"
          onClick={this.handleClickLogin}
        >
          <DeleteIcon className={classes.cardIcon} />
        </Button>
      );
    }
    return null;
  }

  renderOrders() {
    const { classes, orders } = this.props;
    if (orders && orders.queryResult && orders.queryResult.data && orders.isFinished) {
      const output = orders.queryResult.data.map((order) => (
        <Card key={order.id} className={classes.itemCard}>
          <Grid container direction="row">
            <Grid item xs={11} md={10}>
              <Typography variant="title">
                {order.title}
              </Typography>
              <Typography variant="body2">
                {this.renderUsername(order.author)}
              </Typography>
            </Grid>
            <Grid item xs={1} md={2} align="right">
              { this.renderDeleteAction(order.author.id) }
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="right">
                {this.renderCreationDate(order.creationDate)}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      ));
      return output;
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Card className={classes.mainCard}>
          <CardContent>
            { this.renderOrders() }
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={this.handleClickLogin}
            >
              <Typography variant="button" style={styles.button}>
                Confirmar
              </Typography>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

OrderList.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { orders: state.orders, ui: state.ui, user: state.user };
}

export default connect(mapStateToProps)(withStyles(styles)(OrderList));

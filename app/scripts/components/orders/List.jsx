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
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const styles = {
  card: {
    minWidth: '100%',
    borderRadius: '3px',
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

  renderOrders(classes, orders) {
    if (orders && orders.queryResult && orders.queryResult.data && orders.isFinished) {
      const output = orders.queryResult.data.map((order) => (
        <Card key={order._id} className={classes.card}>
          <Typography variant="body2">
            order.author
          </Typography>
        </Card>
      ));
      return output;
    }
    return null;
  }

  render() {
    const { classes, orders } = this.props;
    return (
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="title">
              Pedidos
            </Typography>
            { this.renderOrders(orders) }
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
  orders: PropTypes.object,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return { orders: state.orders };
}

export default connect(mapStateToProps)(withStyles(styles)(OrderList));

/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Restaurant from '@material-ui/icons/Restaurant';
import FavoriteIcon from '@material-ui/icons/Favorite';

/** Custom Imports */
import OrderCreate from 'components/orders/Create';
import OrderList from 'components/orders/List';


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing.unit * 0,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  body: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  submenu: {
    minWidth: '100%',
    borderRadius: '3px',
  },
});


class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderTabs() {
    const { value } = this.state;

    return (
      <div key="Orders">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Pedidos Activos" icon={<Restaurant />} />
            <Tab label="Crear Pedido" icon={<FavoriteIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && this.renderActiveOrders()}
        {value === 1 && this.renderOrderCreate()}
      </div>
    );
  }

  renderActiveOrders() {
    return (
      <OrderList orders={this.props.orders || {}} />
    );
  }

  renderOrderCreate() {
    return (
      <OrderCreate user={this.props.user} />
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.body}>
        <Paper className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              { this.renderTabs() }
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return { orders: state.orders, user: state.user };
}

export default connect(mapStateToProps)(withStyles(styles)(Orders));

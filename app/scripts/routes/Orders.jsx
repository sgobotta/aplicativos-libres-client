/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
/** Material UI Imports */
import {
  createMuiTheme, withStyles, MuiThemeProvider,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Restaurant from '@material-ui/icons/Restaurant';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

/** Custom Imports */
import OrderCreate from 'components/orders/Create';
import OrderList from 'components/orders/List';
import MyOrders from 'components/orders/MyOrders';


const appBarTheme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        backgroundColor: 'transparent',
        border: '0px',
      },
    },
  },
  palette: {
    primary: {
      light: deepPurple[300],
      main: 'rgb(205, 205, 231)',
      dark: deepPurple[600],
      contrastText: deepPurple[900],
    },
    secondary: {
      main: 'rgb(0, 120, 215)',
    },
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing.unit * 0,
    display: 'flex',
    justifyContent: 'center',
  },
  body: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  submenu: {
    minWidth: '80%',
    backgroundColor: '#000',
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
        <MuiThemeProvider theme={appBarTheme}>
          <AppBar
            position="static"
            color="primary"
          >
            <Tabs
              value={value}
              onChange={this.handleChange}
              scrollable
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label="Pedidos" icon={<Restaurant />} />
              <Tab label="Nuevo Pedido" icon={<AddShoppingCart />} />
              <Tab label="Mis Pedidos" icon={<FavoriteIcon />} />
            </Tabs>
          </AppBar>
          {value === 0 && this.renderActiveOrders()}
          {value === 1 && this.renderOrderCreate()}
          {value === 2 && this.renderMyOrders()}
        </MuiThemeProvider>
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

  renderMyOrders() {
    return (
      <MyOrders />
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
  return { orders: state.orders, ui: state.ui, user: state.user };
}

export default connect(mapStateToProps)(withStyles(styles)(Orders));

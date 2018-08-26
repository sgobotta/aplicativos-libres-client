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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Restaurant from '@material-ui/icons/Restaurant';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import SwipeableViews from 'react-swipeable-views';

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
        padding: '0px',
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
});


class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  renderTabs() {
    const { index } = this.state;

    return (
      <MuiThemeProvider key="Orders" theme={appBarTheme}>
        <AppBar
          position="static"
          color="primary"
        >
          <Tabs
            value={index}
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
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
          style={{}}
        >
          { this.renderActiveOrders() }
          { this.renderOrderCreate() }
          { this.renderMyOrders() }
        </SwipeableViews>
      </MuiThemeProvider>
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
      <div className={classes.body} style={{ backgroundColor: 'transparent', boxShadow: '0px' }}>
        <Grid container>
          <Grid item xs={12} style={{ padding: '0px' }} >
            { this.renderTabs() }
          </Grid>
        </Grid>
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

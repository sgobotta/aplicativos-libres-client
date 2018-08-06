/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
import { findOrders, showAlert } from 'actions';
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
    // const { query } = this.state;
    const { dispatch } = this.props;

    dispatch(findOrders());
  }

  componentWillReceiveProps(nextProps) {
    console.log('list next props', nextProps);
    // const { dispatch, orders: { orders } } = this.props;
    // const { github: { repos: nextRepos } } = nextProps;
    //
    // if (repos.status === 'running' && nextRepos.status === 'error') {
    //   dispatch(showAlert(nextRepos.message, { type: 'error' }));
    // }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="title">
              Pedidos
            </Typography>
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

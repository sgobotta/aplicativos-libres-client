/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
/** Redux Imports */
import { connect } from 'react-redux';
import { findOrders, deleteOrder, patchOrder } from 'actions';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

/** Miscellaneous Imports */
import { DateUtils } from 'utils';
import FullDialog from 'components/FullDialog';


const query = {};

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
  },
  secondaryHeading: {
    paddingTop: '5px',
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.text.secondary,
    alignText: 'right',
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '100.00%',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  panelActions: {
    padding: '5px 5px 5px 5px',
  },
  mainCard: {
    minWidth: '100%',
    maxWidth: '100%',
  },
  itemCard: {
    padding: '5px 5px 5px 5px',
    borderRadius: '0px',
    '&:hover': {
      backgroundColor: 'rgb(205, 205, 231)',
      marginBottom: '2px',
      borderBottomLeftRadius: '7px',
    },
  },
  orderFinished: {
    border: 'solid brown 1px',
    borderRadius: '4  px',
    borderBottomLeftRadius: '7px',
    backgroundColor: 'red',
  },
  cardIcon: {
    color: 'red',
  },
  username: {
    fontWeight: 'bold',
  },
  creationDate: {
    fontSize: '12px',
    fontStyle: 'italic',
  },
});

const options = [
  { name: 'Dulce de leche' },
  { name: 'Chocolate' },
  { name: 'Dulce de leche Zarpado' },
  { name: 'Vainilla' },
  { name: 'Cereza' },
  { name: 'Crema Americana' },
  { name: 'Banana' },
  { name: 'Limón' },
  { name: 'Menta Granizada' },
  { name: 'Chocolate Caruso' },
];

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(findOrders(query));
  }

  /**
   * Actions
   * */

  handleRemove(orderId) {
    const { dispatch } = this.props;
    dispatch(
      deleteOrder({
        id: orderId, dispatch,
      })
    );
    this.setState({
      expanded: '',
    });
  }

  handleSave = (orderId, checkedOptions) => {
    const { dispatch } = this.props;
    dispatch(
      patchOrder({
        id: orderId,
        checkedOptions,
        service: 'addParticipant',
        dispatch,
      })
    );
  }

  handleLeave = (orderId, participantId) => () => {
    const { dispatch } = this.props;
    dispatch(
      patchOrder({
        id: orderId,
        participantId,
        service: 'removeParticipant',
        dispatch,
      })
    );
  }

  handleFinish = (orderId) => () => {
    const { dispatch } = this.props;
    dispatch(
      patchOrder({
        id: orderId,
        service: 'finishOrder',
        dispatch,
      })
    );
  }

  handleRestart = (orderId) => () => {
    const { dispatch } = this.props;
    dispatch(
      patchOrder({
        id: orderId,
        service: 'restartOrder',
        dispatch,
      })
    );
  }

  handlePanelToggling = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

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

  renderCreationDate(order) {
    const { classes } = this.props;
    let date;
    if (order.isActive) {
      date = DateUtils.getElapsedTime(order.creationDate);
      return (
        <span className={classes.creationDate}>Creado {date}</span>
      );
    }
    date = DateUtils.getElapsedTime(order.updatedDate);
    return (
      <span className={classes.creationDate}>Cerrado {date}</span>
    );
  }

  renderOrderInfo(order) {
    const { classes, user } = this.props;

    const currentUserId = user.data.id;
    const { participants } = order;
    const quantity = participants.length;

    const participantIds = order.participants.map((p) => p.participantId);
    if (participantIds.indexOf(currentUserId) >= 0) {
      if (quantity === 2) {
        return (
          <Typography align="left" className={classes.secondaryHeading}>
            Vos y otro muertx de hambre están esperando el helado...
          </Typography>
        );
      }
      if (quantity === 1) {
        return (
          <Typography align="left" className={classes.secondaryHeading}>
            Sos el único muertx de hambre que se anotó
          </Typography>
        );
      }
      if (quantity > 2) {
        return (
          <Typography align="left" className={classes.secondaryHeading}>
            Vos y otros {quantity - 1} muertxs de hambre que están esperando el helado...
          </Typography>
        );
      }
    }
    if (quantity === 1) {
      return (
        <Typography align="left" className={classes.secondaryHeading}>
          Hay 1 muertx de hambre esperando el helado...
        </Typography>
      );
    }
    if (quantity > 1) {
      return (
        <Typography align="left" className={classes.secondaryHeading}>
          Hay {quantity} muertxs de hambre que están esperando el helado...
        </Typography>
      );
    }
    return (
      <Typography align="left" className={classes.secondaryHeading}>
        Todavía no hay golosxs
      </Typography>
    );
  }

  renderParticipant(participant, index) {
    return (
      <Typography variant="body2" key={index}>
        {participant.username}: { participant.selection }
      </Typography>
    );
  }

  renderParticipants(order) {
    const { participants } = order;
    let output;
    if (order.participants.length > 0) {
      output = participants.map((participant, index) => (
        this.renderParticipant(participant, index)
      ));
      return output;
    }
    return null;
  }

  renderOptions(order) {
    if (order.isActive) {
      const { user } = this.props;
      const currentParticipant = order.participants
        .find((participant) => user.data.id === participant.participantId);
      const selection = (currentParticipant && currentParticipant.selection) || [];

      let buttonText;
      if (selection.length > 0) {
        buttonText = 'Cambiar gustos';
      }
      else {
        buttonText = 'Elegí gustos!';
      }
      return (
        <FullDialog
          buttonText={buttonText}
          title="Saborrrr"
          confirmText="Guardar"
          options={options}
          handleSave={this.handleSave}
          orderId={order.id}
          selection={selection}
        />
      );
    }
    return null;
  }

  renderLeaveButton(order) {
    const { user } = this.props;

    const currentUserId = user.data.id;
    const participantIds = order.participants.map((p) => p.participantId);
    if (participantIds.indexOf(currentUserId) >= 0) {
      return (
        <Button
          mini={true}
          size="small"
          color="primary"
          align="right"
          onClick={this.handleLeave(order.id, currentUserId)}
        >
          Me arrepentí...
        </Button>
      );
    }
    return null;
  }

  renderFinishAction(order) {
    const { user } = this.props;
    if (user.data.id === order.author.id) {
      if (order.isActive) {
        return (
          <Button
            size="small"
            color="primary"
            align="left"
            onClick={this.handleFinish(order.id)}
          >
            Cerrar Pedido
          </Button>
        );
      }
      return (
        <Button
          size="small"
          color="primary"
          align="left"
          onClick={this.handleRestart(order.id)}
        >
          Reabrir Pedido
        </Button>
      );
    }
    return null;
  }

  renderCancelAction() {
    return (
      <Button
        size="small"
        color="primary"
        align="left"
        onClick={this.handlePanelToggling()}
      >
        Esconder
      </Button>
    );
  }

  renderDeleteAction(order) {
    const { classes, user } = this.props;
    if (order.author.id === user.data.id) {
      return (
        <Button
          size="small"
          onClick={() => { this.handleRemove(order.id); }}
        >
          <DeleteIcon className={classes.cardIcon} />
        </Button>
      );
    }
    return null;
  }

  renderOrder(order, index) {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div
        className={
          classNames(classes.root, order.isActive ? '' : classes.orderFinished)
        }
        key={index}
      >
        <ExpansionPanel
          className={classes.itemCard}
          expanded={expanded === `panel${index}`}
          onChange={this.handlePanelToggling(`panel${index}`)}
        >
          <ExpansionPanelSummary
            style={{ padding: '0 4px 0 4px' }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container direction="row">
              <Grid item xs={6}>
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    {order.title}
                  </Typography>
                  <Typography variant="body2">
                    {this.renderUsername(order.author)}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.column} style={{ padding: '0 4px 0 4px' }}>
                  <Typography align="right" className={classes.secondaryHeading}>
                    {this.renderCreationDate(order)}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                { this.renderOrderInfo(order) }
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details} style={{ padding: '0 4px 0 4px' }}>
            <Grid container direction="row">
              <Grid item xs={12}>
                { this.renderParticipants(order) }
              </Grid>
              <Grid item xs={6}>
                { this.renderOptions(order) }
              </Grid>
              <Grid item xs={6}>
                { this.renderLeaveButton(order) }
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions className={classes.panelActions}>
            { this.renderFinishAction(order) }
            { this.renderCancelAction() }
            { this.renderDeleteAction(order) }
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }

  renderOrders() {
    const { orders } = this.props;
    if (orders && orders.queryResult && orders.queryResult.data && orders.isFinished) {
      const output = orders.queryResult.data.map((order, index) => (
        this.renderOrder(order, index)
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

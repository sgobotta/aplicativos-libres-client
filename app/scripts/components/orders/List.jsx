/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
/** Redux Imports */
import { connect } from 'react-redux';
import { findOrders, deleteOrder, patchOrder } from 'actions';
/** Material UI Imports */
import { createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';
/** Application Imports */
import ExpansionPanel from 'components/custom/ExpansionPanel';

/** Miscellaneous Imports */
import { DateUtils } from 'utils';
import FullDialog from 'components/FullDialog';
import Avatar from 'components/Avatar';
import { options } from './options';


const query = {};

const expansionPanelTheme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        padding: '0px',
        background: 'transparent',
      },
    },
    MuiExpansionPanel: {
      root: {
        backgroundColor: 'rgb(205, 205, 231)',
        borderRadius: '0px',
      },
      expanded: {
        backgroundColor: 'rgb(180, 205, 231)',
      },
    },
  },
});

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(12),
  },
  secondaryHeading: {
    paddingTop: '5px',
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
    alignText: 'right',
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
  expansionPanel: {
    padding: '5px 5px 5px 5px',
    borderRadius: '0px',
    '&:hover': {
      backgroundColor: 'rgb(180, 205, 231)',
      marginBottom: '12px',
      borderBottomLeftRadius: '7px',
    },
    borderTopLeftRadius: '0px !important',
    borderTopRightRadius: '0px !important',
    borderBottomRightRadius: '0px !important',
  },
  expansionPanelSummary: {
    padding: '0 4px 0 4px',
  },
  expansionPanelDetails: {
    alignItems: 'center',
    padding: '0 4px 0 4px',
  },
  expansionPanelActions: {
    padding: '5px 5px 5px 10px',
  },
  orderFinished: {
    borderBottomLeftRadius: '7px',
    backgroundColor: '#db5858',
    '&:hover': {
      backgroundColor: '#f27573',
    },
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
  participantUser: {
    marginTop: '10px',
    fontWeight: 'bold',
  },
  participantInfo: {
    padding: '0px 0 12px 0',
    marginTop: '8px',
    marginBottom: '0px',
  },
  participantSelection: {
    padding: '4px 0 4px 0',
  },
});

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
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
    let userName = author.username;
    if (author.id === user.data.id) {
      userName = 'yo';
    }
    return <span className={classes.username}>Responsable: {userName}</span>;
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
            Sos le únicx muertx de hambre que se anotó
          </Typography>
        );
      }
      if (quantity > 2) {
        return (
          <Typography align="left" className={classes.secondaryHeading}>
            Vos y otrxs {quantity - 1} muertxs de hambre están esperando el helado...
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

  renderParticipantSelection(selection) {
    if (selection.length === 1) {
      return selection[0];
    }
    if (selection.length === 2) {
      return `${selection[0]} y ${selection[1]}`;
    }
    if (selection.length === 3) {
      return `${selection[0]}, ${selection[1]} y ${selection[2]}`;
    }
    return 'No eligió sabores... solo quiere figurar.';
  }

  renderParticipant(participant, index) {
    const { classes } = this.props;
    const initial = participant.username.charAt(0);
    return (
      <Grid
        container
        direction="row"
        key={index}
        className={classes.participantInfo}
      >
        <Grid item xs={2} md={1}>
          <Avatar initials={initial} />
        </Grid>
        <Grid item xs={10} md={11}>
          <Typography
            variant="body2"
            align="left"
            className={classes.participantUser}
          >
            { index + 1 }. { participant.username }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            align="center"
            className={classes.participantSelection}
          >
            { this.renderParticipantSelection(participant.selection) }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
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
          confirmText=""
          options={options}
          handleSave={this.handleSave}
          orderId={order.id || order._id}
          selection={selection}
          confirmIcon={<SaveIcon />}
        />
      );
    }
    return null;
  }

  /** Actions Render */

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

  /** Expansion Panel Render */

  renderExpansionPanelSummary(order) {
    const { classes } = this.props;
    return (
      <Grid container direction="row">
        <Grid item xs={6}>
          <Typography className={classes.heading}>
            {this.renderUsername(order.author)}
          </Typography>
          <Typography>
            {order.title}
          </Typography>
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
    );
  }

  renderExpansionDetails(order) {
    return (
      <Grid container direction="row">
        <Grid item xs={12}>
          { this.renderParticipants(order) }
        </Grid>
      </Grid>
    );
  }

  renderExpansionActions(order) {
    return (
      <React.Fragment>
        { this.renderOptions(order) }
        { this.renderLeaveButton(order) }
        { this.renderFinishAction(order) }
        { this.renderDeleteAction(order) }
      </React.Fragment>
    );
  }

  renderOrder(order, index) {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div
        className={classNames(classes.root)}
        key={index}
      >
        <ExpansionPanel
          actionsClassName={classes.expansionPanelActions}
          actionsContent={this.renderExpansionActions(order)}
          detailsClassName={classes.expansionPanelDetails}
          detailsContent={this.renderExpansionDetails(order)}
          expanded={expanded === `panel${index}`}
          expandIcon={<ExpandMoreIcon />}
          onChange={this.handlePanelToggling(`panel${index}`)}
          panelClassName={
            classNames(
              classes.expansionPanel,
              order.isActive ? '' : classes.orderFinished
            )
          }
          summaryClassName={classNames(classes.expansionPanelSummary)}
          summaryContent={this.renderExpansionPanelSummary(order)}
        />
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
    return (
      <MuiThemeProvider theme={expansionPanelTheme}>
        <Grid style={{ width: '100%', background: 'transparent' }}>
          <CardContent style={{ padding: '0px', background: 'transparent' }}>
            { this.renderOrders() }
          </CardContent>
        </Grid>
      </MuiThemeProvider>
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

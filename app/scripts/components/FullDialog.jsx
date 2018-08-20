import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import OptionsForm from 'components/OptionsForm';


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
    checkedOptions: this.props.selection || [],
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.props.handleSave(this.props.orderId, this.state.checkedOptions);
    this.handleClose();
  }

  handleCheck = (checkedOptions) => {
    this.setState({
      checkedOptions,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button size="small" color="primary" onClick={this.handleClickOpen}>{this.props.buttonText}</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar style={{ backgroundColor: 'green' }}>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                { this.props.title }
              </Typography>
              <Button color="inherit" onClick={this.handleSave}>
                { this.props.confirmText }
              </Button>
            </Toolbar>
          </AppBar>
          <Card>
            <OptionsForm
              options={this.props.options}
              handleCheck={this.handleCheck}
              selection={this.props.selection}
            />
          </Card>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  confirmText: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  orderId: PropTypes.string.isRequired,
  selection: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return { ui: state.ui };
}

export default connect(mapStateToProps)(withStyles(styles)(FullScreenDialog));

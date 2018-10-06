/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** UI Material Imports */
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default class CustomExpansionPanel extends React.Component {
  renderSummary() {
    const { expandIcon = <ExpandMoreIcon />, summaryContent, summaryClassName } = this.props;
    return (
      <ExpansionPanelSummary
        expandIcon={expandIcon}
        className={summaryClassName}
      >
        { summaryContent }
      </ExpansionPanelSummary>
    );
  }

  renderDetails() {
    const { detailsContent, detailsClassName } = this.props;
    return (
      <ExpansionPanelDetails className={detailsClassName}>
        { detailsContent }
      </ExpansionPanelDetails>
    );
  }

  renderActions() {
    const { actionsContent, actionsClassName } = this.props;
    return (
      <ExpansionPanelActions className={actionsClassName}>
        { actionsContent }
      </ExpansionPanelActions>
    );
  }

  render() {
    const { expanded, onChange, panelClassName } = this.props;
    return (
      <ExpansionPanel
        className={panelClassName}
        expanded={expanded}
        onChange={onChange}
      >
        { this.renderSummary() }
        { this.renderDetails() }
        { this.renderActions() }
      </ExpansionPanel>
    );
  }
}

CustomExpansionPanel.propTypes = {
  actionsClassName: PropTypes.string,
  actionsContent: PropTypes.node,
  detailsClassName: PropTypes.string,
  detailsContent: PropTypes.node,
  expanded: PropTypes.bool.isRequired,
  expandIcon: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  panelClassName: PropTypes.string,
  summaryClassName: PropTypes.string,
  summaryContent: PropTypes.node,
};

/** React Imports */
import React from 'react';
// import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
// import { createOrder } from 'actions';
/** App Imports */
import { DateUtils } from 'utils/dates';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'components/Loader';
/** Material UI Imports */
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
/** Material UI Icons */

import firstFakeDataFetch from './smallerFakeData';
import secondFakeDataFetch from './biggerFakeData';
import oneElementFakeData from './oneElementFakeData';
// import smallerFakeData from './smallerFakeData';


const cardTheme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        padding: '0px',
        backgroundColor: 'rgb(180, 205, 231)',
        borderBottomLeftRadius: '3px',
        borderBottomRightRadius: '3px',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '0px',
      },
    },
  },
});

const styles = {
  messages: {
    card: {
      marginTop: '40px',
      marginBottom: '25px',
      borderRadius: '10px',
      backgroundColor: 'rgb(205, 205, 231)',
      width: '30%',
    },
  },
  item: {
    root: {
      marginTop: '45px',
      marginBottom: '45px',
    },
    date: {
      marginTop: '10px',
      fontWeight: 'bold',
    },
    title: {
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    description: {
      fontStyle: 'italic',
      width: '100%',
      height: '100%',
    },
    address: {
      fontWeight: 'bold',
      color: 'rgb(0, 120, 215)',
    },
  },
};


class ViewEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      items: firstFakeDataFetch,
      isRefreshing: false,
    };
  }

  renderDate(date) {
    return DateUtils.getParsedDate(date);
  }

  renderLoader() {
    return (
      <Loader style={{ position: 'relative', top: '100px' }} />
    );
  }

  renderEndMessage() {
    return (
      <Typography
        style={{ color: 'white' }}
        align="center"
        variant="headline"
      >
        ¿Más eventos queres? Creá uno vos ¯\_(ツ)_/¯
      </Typography>
    );
  }

  renderPullDown() {
    return (
      <Card style={styles.messages.card}>
        <Typography
          style={{ color: 'white' }}
          align="center"
          variant="button"
        >
          Pulleá para refrescar ✌(-‿-)✌
        </Typography>
      </Card>
    );
  }

  renderRelease() {
    return (
      <Typography
        style={{ color: 'white' }}
        align="center"
        variant="headline"
      >
        Soltá para refrescar ლ(ಠ益ಠლ)
      </Typography>
    );
  }

  renderItems(items) {
    // style={{ backgroundColor: 'white', color: 'black', marginTop: '40px', marginBottom: '40px' }}
    const content = items.map((item, index) => (
      <div
        key={`${index}`}
        style={styles.item.root}
      >
        <Grid item xs={12} md={12}>
          <Grid container direction="column">
            <Card>
              <CardContent>
                <Grid item xs={12}>
                  <Typography align="left" variant="subheading" style={styles.item.date}>
                    {this.renderDate(item.date)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="center" variant="headline" style={styles.item.title}>
                    {item.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={styles.item.description}>
                  <TextField
                    fullWidth
                    align="right"
                    InputLabelProps={{ shrink: true }}
                    multiline
                    variant="outlined"
                    margin="normal"
                    value={item.description}
                  >
                    {}
                  </TextField>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Grid item xs={12}>
                  <Typography align="right" variant="button" style={styles.item.address}>
                    Lugar | {item.address}
                  </Typography>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    ));
    return content;
  }

  updateItems() {
    const { items } = this.state;
    const newItems = oneElementFakeData;
    const result = [];
    newItems.forEach((newItem) => {
      result.push(newItem);
    });
    items.forEach((item) => {
      result.push(item);
    });
    return result;
  }

  refresh = () => {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      console.log('should refresh one element');
      this.setState({
        hasMore: true,
        items: this.updateItems(),
        isRefreshing: false,
      });
    }, 500);
  }

  fetchData = () => setTimeout(() => {
    console.log('should fetch data...');
    this.setState({
      hasMore: false,
      items: this.state.items.concat(secondFakeDataFetch),
    });
  }, 500);

  renderInfiniteScroll() {
    const { hasMore, items } = this.state;
    return (
      <InfiniteScroll
        dataLength={items.length}
        next={this.fetchData}
        hasMore={hasMore}
        loader={this.renderLoader()}
        endMessage={this.renderEndMessage()}
        refreshFunction={this.refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={300}
        pullDownToRefreshContent={this.renderPullDown()}
        releaseToRefreshContent={this.renderRelease()}
      >
        { this.renderItems(this.state.items) }
      </InfiniteScroll>
    );
  }

  render() {
    const { isRefreshing } = this.state;
    return (
      <div id="scrollableDiv">
        <MuiThemeProvider theme={cardTheme}>
          <Grid
            container
            direction="column"
          >
            { isRefreshing && this.renderLoader() }
            { this.renderInfiniteScroll() }
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

ViewEvents.propTypes = {
  // classes: PropTypes.object.isRequired,
  // dispatch: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return { dispatch: state.dispatch, ui: state.ui };
}

export default connect(mapStateToProps)(withStyles(styles)(ViewEvents));

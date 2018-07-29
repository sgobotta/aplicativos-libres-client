import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { getRepos, showAlert } from 'actions';

import Loader from 'components/Loader';

export class AppsGrid extends React.Component {
  state = {
    query: 'react',
  };

  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    // github: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // const { query } = this.state;
    // const { dispatch } = this.props;
    //
    // dispatch(getRepos(query));
  }

  componentWillReceiveProps(nextProps) {
    // const { dispatch, github: { repos } } = this.props;
    // const { github: { repos: nextRepos } } = nextProps;
    //
    // if (repos.status === 'running' && nextRepos.status === 'error') {
    //   dispatch(showAlert(nextRepos.message, { type: 'error' }));
    // }
  }

  handleClick = (e) => {
    // const { query } = e.currentTarget.dataset;
    // const { dispatch, github } = this.props;
    //
    // this.setState({
    //   query,
    // });
    //
    // if (!github.repos.data[query] || !github.repos.data[query].length) {
    //   dispatch(getRepos(query));
    // }
  };

  render() {
    const { query } = this.state;
    // const { github } = this.props;
    const apps = {};
    apps.data = [];
    apps.status = 'loaded';
    let output;
    const anApp = {
      id: '1',
      owner: { login: 'Santiago', avatar_url: 'lala' },
      name: 'Porcentaje de votos a favor',
      html_url: '/map',
      description: 'Un simple mapa',
    };
    apps.data.push(anApp);
    if (apps.data && apps.status === 'loaded') {
      output = (
        <ul className={`app__home__grid app__home__grid--${query}`}>
          {apps.data
            .map(d => (
              <li key={d.id}>
                <div className="app__home__item">
                  <img src={d.owner.avatar_url} alt={d.owner.login} />
                  <div>
                    <h5>
                      <a href={d.html_url}>{d.name}</a>
                      <small>{d.owner.login}</small>
                    </h5>
                    <div>{d.description}</div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      );
    }
    else {
      output = <Loader />;
    }

    return (
      <div key="Apps" className="app__apps_grid">
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { apps: state.github };
}

export default connect(mapStateToProps)(AppsGrid);

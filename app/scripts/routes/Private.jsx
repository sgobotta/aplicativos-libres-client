import React from 'react';

const rndNumber = parseInt(Math.random() * 3, 3) + 1;

export default class Private extends React.PureComponent {
  render() {
    return (
      <div key="Private" className="app__private app__route">
        <div className="app__container">
          <div className="app__private__header">
            <h3>¿Qué estámo' haciendo?</h3>
            <div style={{ textAlign: 'center' }} >
              <img src={require(`assets/media/images/gif_${rndNumber}.gif`)} alt="Monkey Dooh" />
            </div>
          </div>
          <div className="app__private__content">
            <div className="app__private__intro text-center">
              <h5>It is so fun, so baby come on!</h5>
              <small className="text-muted"><i>*Do the locomotion...</i></small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

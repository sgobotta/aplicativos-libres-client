import React from 'react';
import Typography from '@material-ui/core/Typography';

const Footer = () => (
  <footer className="app__footer">
    <div className="app__container">
      <Typography align="left" variant="title" color="secondary">
        <a href="https://github.com/sgobotta/" target="_blank">
          <img
            style={{ width: '30px', height: '30px' }}
            src={require('assets/media/images/github_mark.png')}
            alt="Github"
          />
          sgobotta
        </a>
      </Typography>
    </div>
  </footer>
);

export default Footer;

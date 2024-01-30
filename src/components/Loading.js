import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import '../styles/components/loading.css';

class Loading extends React.Component {
  render() {
    const { showDefaultBackground } = this.props;
    return (
      <div
        className={ showDefaultBackground ? 'loading-container' : 'loading-albums' }
      >
        <FontAwesomeIcon icon={ faSpinner } className="loading-icon" spin />
        <span className="loading-text">Carregando...</span>
      </div>
    );
  }
}

Loading.propTypes = {
  showDefaultBackground: PropTypes.bool.isRequired,
};

export default Loading;

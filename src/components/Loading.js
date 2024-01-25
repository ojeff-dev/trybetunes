import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import '../styles/components/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={ faSpinner } className="loading-icon" spin />
        <span className="loading-text">Carregando...</span>
      </div>
    );
  }
}

export default Loading;

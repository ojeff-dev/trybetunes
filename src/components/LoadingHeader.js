import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import '../styles/components/loadingHeader.css';

class LoadingHeader extends React.Component {
  render() {
    return (
      <div className="loading-header-container">
        <FontAwesomeIcon icon={ faSpinner } className="loading-header-icon" spin />
        <span className="loading-header-text">Loading...</span>
      </div>
    );
  }
}

export default LoadingHeader;

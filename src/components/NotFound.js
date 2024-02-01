import React from 'react';

import '../styles/components/notFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div
        data-testid="page-not-found"
        className="not-found-container"
      >
        <h1
          className="not-found-title"
        >
          Ops!
        </h1>
        <p
          className="not-found-message"
        >
          The page you are looking for was not found.
        </p>
      </div>
    );
  }
}

export default NotFound;

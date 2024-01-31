import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

import '../styles/components/musicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  handleChange = async ({ target }) => {
    const { name, checked } = target;
    const { music, handleCheckbox } = this.props;

    handleCheckbox(name, checked);

    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
  };

  render() {
    const { music, checkboxValue, trackId } = this.props;

    return (
      <div className="songs-container">
        <section className="songs-content">
          <span className="music-name">{music.trackName}</span>
          <audio
            className="music-audio"
            data-testid="audio-component"
            src={ music.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>Audio</code>
          </audio>
          <label htmlFor={ music.trackName }>
            <input
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleChange }
              type="checkbox"
              checked={ checkboxValue }
              name={ music.trackName }
              id={ music.trackName }
            />
          </label>
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  checkboxValue: PropTypes.bool.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  trackId: PropTypes.string.isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;

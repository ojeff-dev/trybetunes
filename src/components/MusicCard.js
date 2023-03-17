import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = async ({ target }) => {
    const { name, checked } = target;
    const { music, albumExist, handleCheckbox } = this.props;

    if (checked) {
      handleCheckbox(name, checked);
      albumExist(false);
      await addSong(music);
      albumExist(true);
    } else {
      handleCheckbox(name, checked);
      albumExist(false);
      await removeSong(music);
      albumExist(true);
    }
  };

  render() {
    const { music, checkboxValue } = this.props;

    return (
      <div>
        <section className="Musics">
          <p>{music.trackName}</p>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>Audio</code>
          </audio>
          <label htmlFor={ music.trackName }>
            <span>Favorita</span>
            <input
              data-testid={ `checkbox-music-${music.trackId}` }
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
  music: PropTypes.objectOf(PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  })).isRequired,
  albumExist: PropTypes.func.isRequired,
  checkboxValue: PropTypes.bool.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

export default MusicCard;

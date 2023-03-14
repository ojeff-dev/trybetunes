import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { albums } = this.props;
    return (
      <div className="MusicsContainer">
        {
          albums.map((album, index) => (
            index > 0 ? (
              <section key={ index } className="Musics">
                <p>{ album.trackName }</p>
                <audio data-testid="audio-component" src={ album.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>Audio</code>
                </audio>
              </section>
            )
              : (null)
          ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({
    artistName: PropTypes.string.isRequired,
  })).isRequired,
};

export default MusicCard;

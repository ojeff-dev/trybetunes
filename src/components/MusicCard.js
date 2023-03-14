import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checkbox: {},
    };
  }

  handleChange = ({ target }) => {
    const { albums } = this.props;
    const { name, checked } = target;
    const favoriteSong = albums.find((album) => album.trackName === name);

    if (checked) {
      // aciona o loading do campo e add a música aos favoritos
      this.setState({ loading: true }, async () => {
        await addSong(favoriteSong);
        this.setState((prevState) => ({
          // remove o loading do campo e altera o status do checkbox clicado
          loading: false,
          checkbox: { ...prevState.checkbox, [name]: true },
        }));
      });
    } else {
      // desmarca o checkbox clicado
      this.setState((prevState) => ({
        checkbox: { ...prevState.checkbox, [name]: false },
      }));
    }
  };

  render() {
    const { albums } = this.props;
    const { loading, checkbox } = this.state;

    return (
      <div className="MusicsContainer">
        {
          loading ? <Loading />
            : (
              albums.map((album, index) => (
                index > 0 ? (
                  <section key={ index } className="Musics">
                    <p>{ album.trackName }</p>
                    <audio
                      data-testid="audio-component"
                      src={ album.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      <code>Audio</code>
                    </audio>
                    <label
                      htmlFor=""
                    >
                      <span>Favorita</span>
                      <input
                        data-testid={ `checkbox-music-${album.trackId}` }
                        onChange={ this.handleChange }
                        type="checkbox"
                        checked={ checkbox[album.trackName] }
                        name={ album.trackName }
                        id=""
                      />
                    </label>
                  </section>
                )
                  : (null)
              ))
            )
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

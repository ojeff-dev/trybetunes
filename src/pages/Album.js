import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import '../styles/album.css';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumExist: false,
      albums: [],
      favoritedSongs: [],
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;

    // captura o ID do album
    const albumURL = pathname.split('/');
    const ID = albumURL[2];

    // adiciona array de albuns no state
    const data = await getMusics(ID);
    this.setState({ albums: data });

    // adiciona os names do input e seus valores iniciais no state
    data.filter((albums) => albums.trackName)
      .map((music) => this.setState({ [music.trackName]: false }));

    // salva músicas da lista de favoritos no state e liga o checkbox das músicas presentes na lista
    const favorites = await getFavoriteSongs();
    this.setState({ favoritedSongs: favorites, albumExist: true });

    favorites.forEach((favSong) => {
      this.setState({ [favSong.trackName]: true });
    });
  }

  // altera o valor dos checkbox no state
  handleCheckbox = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const {
      albums, albumExist,
    } = this.state;
    const { state } = this;

    return (
      <div data-testid="page-album" className="page-album-container">
        <Header />
        <div className="background-blue" />
        <section className="album-container">
          {albumExist ? (
            <>
              <section className="album-info-container">
                <img
                  className="music-image"
                  src={ albums[0].artworkUrl100 }
                  alt={ albums[0].collectionName }
                />
                <div>
                  <span
                    data-testid="album-name"
                    className="album-name-text"
                  >
                    {albums[0].collectionName}
                  </span>
                  <span
                    className="artist-name-text"
                    data-testid="artist-name"
                  >
                    {albums[0].artistName}
                  </span>
                </div>
              </section>
              <div className="album-songs-container">
                <section className="album-songs">
                  {albums
                    .filter((track) => track.trackName)
                    .map((music, index) => (
                      <MusicCard
                        music={ music }
                        key={ index }
                        checkboxValue={ state[music.trackName] }
                        handleCheckbox={ this.handleCheckbox }
                        trackId={ music.trackId.toString() }
                      />
                    ))}
                </section>
              </div>
            </>
          ) : (
            <Loading showDefaultBackground={ false } />
          )}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

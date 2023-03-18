import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    data.filter((objectAlbum) => this.setState((prevState) => ({
      albums: [...prevState.albums, objectAlbum],
      albumExist: true,
    })));

    // adiciona os names do input e seus valores iniciais no state
    data.filter((albums) => albums.trackName)
      .map((music) => this.setState({ [music.trackName]: false }));

    // salva músicas da lista de favoritos no state e liga o checkbox das músicas presentes na lista
    const favorites = await getFavoriteSongs();
    this.setState({ favoritedSongs: favorites });

    favorites.forEach((favSong) => {
      this.setState({ [favSong.trackName]: true });
    });
  }

  // altera o valor da condicional de renderização no state
  handleAlbumExist = (value) => {
    this.setState({ albumExist: value });
  };

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
      <div data-testid="page-album">
        <Header />
        <section className="PageAlbumContainer">
          {albumExist ? (
            <>
              <section>
                <p data-testid="album-name">{ albums[0].collectionName }</p>
                <p data-testid="artist-name">{ albums[0].artistName }</p>
              </section>
              <section className="AllMusics">
                {albums
                  .filter((track) => track.trackName)
                  .map((music, index) => (
                    <MusicCard
                      music={ music }
                      key={ index }
                      albumExist={ this.handleAlbumExist }
                      checkboxValue={ state[music.trackName] }
                      handleCheckbox={ this.handleCheckbox }
                      trackId={ music.trackId.toString() }
                    />
                  ))}
              </section>
            </>
          ) : (
            <Loading />
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

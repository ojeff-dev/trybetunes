import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albums: '',
      artistName: 'Artist Name',
      albumName: 'Collection Namee',
      albumExist: false,
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;

    // captura o ID do album
    const albumURL = pathname.split('/');
    const ID = albumURL[2];

    // adiciona array de albuns no state
    const allAlbums = await getMusics(ID);
    const artist = [];
    const album = [];
    allAlbums.find((objectAlbum) => artist.push(objectAlbum.artistName));
    allAlbums.find((objectAlbum) => album.push(objectAlbum.collectionName));

    this.setState({
      artistName: artist,
      albumName: album,
      albums: allAlbums,
      albumExist: true,
    });
  }

  render() {
    const {
      albums, albumExist, artistName,
      albumName,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section className="PageAlbumContainer">
          {
            albumExist ? (
              <section>
                <p data-testid="album-name">
                  { albumName }
                </p>
                <p data-testid="artist-name">
                  { artistName }
                </p>
              </section>
            )
              : (null)
          }
          {
            albumExist ? (
              <section className="AllMusics">
                <MusicCard albums={ albums } state={ this.state } />
              </section>
            )
              : <Loading />
          }
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

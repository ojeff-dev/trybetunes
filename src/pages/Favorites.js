import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

import '../styles/favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      albumExist: false,
    };
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    favorites.forEach((favSong) => {
      this.setState({ [favSong.trackName]: true });
    });

    this.setState({ songs: favorites, albumExist: true });
  }

  handleCheckbox = async (name) => {
    const { songs } = this.state;

    const filteredSongs = songs.filter((song) => song.trackName !== name);
    this.setState({ songs: filteredSongs });
  };

  handleLoading = (value) => {
    this.setState({ albumExist: value });
  };

  render() {
    const { songs, albumExist } = this.state;
    const { state } = this;
    return (
      <div data-testid="page-favorites" className="page-favorites-container">
        <Header />
        <section className="page-title">
          <span className="page-title-text">
            Favorite songs
          </span>
        </section>
        <section className="page-songs-section">
          {albumExist ? (
            songs.map((song, index) => (
              <MusicCard
                key={ index }
                music={ song }
                checkboxValue={ state[song.trackName] }
                handleCheckbox={ this.handleCheckbox }
                albumExist={ this.handleLoading }
                trackId={ song.trackId.toString() }
              />
            ))
          )
            : <Loading showDefaultBackground={ false } />}
        </section>
      </div>
    );
  }
}

export default Favorites;

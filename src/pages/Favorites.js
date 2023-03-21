import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

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
    // add o nome das tracks no state e seus valores
    favorites.forEach((favSong) => {
      this.setState({ [favSong.trackName]: true });
    });

    this.setState({ songs: favorites, albumExist: true });
  }

  handleCheckbox = async (name) => {
    const { songs } = this.state;

    const filteredSongs = songs.filter((song) => song.trackName !== name);
    this.setState({ songs: filteredSongs });

    // const song = songs.find((music) => music.trackName === name);
    // await removeSong(song);
  };

  handleLoading = (value) => {
    this.setState({ albumExist: value });
  };

  render() {
    const { songs, albumExist } = this.state;
    const { state } = this;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          albumExist ? (
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
            : <Loading />
        }
      </div>
    );
  }
}

export default Favorites;

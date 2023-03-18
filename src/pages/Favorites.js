import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
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

  async componentDidUpdate() {
    const favorites = await getFavoriteSongs();
    const { songs } = this.state;

    if (JSON.stringify(favorites) !== JSON.stringify(songs)) {
      this.setState({ songs: favorites });
    }
  }

  handleCheckbox = (name, value) => {
    this.setState({ [name]: value });
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

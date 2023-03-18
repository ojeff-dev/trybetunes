import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: '',
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

    if (favorites) {
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
        <p>Componente Favorites</p>
        {
          albumExist ? (
            songs.map((song, index) => (
              <MusicCard
                key={ index }
                music={ song }
                checkboxValue={ state[song.trackName] }
                handleCheckbox={ this.handleCheckbox }
                albumExist={ this.handleLoading }
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

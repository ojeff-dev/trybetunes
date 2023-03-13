import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      statusBtn: true,
      loading: false,
      loadedAlbum: false,
      artistName: '',
      albums: [],
      messageAlbumNotFound: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ inputValue: target.value });
    if (target.value.length >= 2) {
      this.setState({ statusBtn: false });
    } else {
      this.setState({ statusBtn: true });
    }
  };

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const { inputValue } = this.state;
    // add nome do artista no state
    this.setState({ artistName: inputValue }, async () => {
      // adiciona os álbuns no state
      const allAlbums = await searchAlbumsAPI(inputValue);
      allAlbums.map((album) => this.setState((prevState) => ({
        albums: [...prevState.albums, album],
      })));
    });

    this.setState(
      {
        inputValue: '',
        loadedAlbum: true,
        loading: false,
        messageAlbumNotFound: 'Nenhum Álbum foi encontrado',
      },
    );
  };

  render() {
    const {
      statusBtn, inputValue, loading,
      loadedAlbum, artistName, albums,
      messageAlbumNotFound,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Loading />
            : (
              <form>
                <label htmlFor="">
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    value={ inputValue }
                    placeholder="Nome do Artista"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="">
                  <input
                    data-testid="search-artist-button"
                    type="submit"
                    value="Pesquisar"
                    disabled={ statusBtn }
                    onClick={ this.handleClick }
                  />
                </label>
              </form>
            )
        }
        <p>{`Resultado de álbuns de: ${artistName}`}</p>
        <section className="ContainerAlbums">
          {
            loadedAlbum && albums.length > 0 ? (
              albums.map((album) => (
                <Link
                  className="AlbumLinks"
                  to={ `/album/${album.collectionId}` }
                  key={ album.collectionId }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <section className="AlbumCard">
                    <img
                      className="AlbumImage"
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                    />
                    <p className="AlbumInfo">{ album.collectionName }</p>
                    <p className="AlbumInfo">{ album.artistName }</p>
                  </section>
                </Link>
              ))
            )
              : (<span>{ messageAlbumNotFound }</span>)
          }
        </section>
      </div>
    );
  }
}

export default Search;

import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

import '../styles/search.css';
import circleErrorIcon from '../images/circle-error-icon.png';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      statusBtn: true,
      loading: false,
      wasItResearched: false,
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

    const { inputValue } = this.state;
    this.setState({ loading: true, artistName: inputValue }, async () => {
      const allAlbums = await searchAlbumsAPI(inputValue);
      this.setState({
        albums: allAlbums,
        wasItResearched: true,
        loading: false,
        inputValue: '',
        statusBtn: true,
        messageAlbumNotFound: 'No albums found.',
      });
    });
  };

  render() {
    const {
      statusBtn,
      inputValue,
      loading,
      artistName,
      albums,
      messageAlbumNotFound,
      wasItResearched,
    } = this.state;

    return (
      <div data-testid="page-search" className="page-search-container">
        <Header />
        <form className="search-form">
          <label
            htmlFor=""
            className="search-label"
          >
            <input
              className="search-input"
              data-testid="search-artist-input"
              type="text"
              value={ inputValue }
              placeholder="Artist name"
              onChange={ this.handleChange }
            />
          </label>
          <label
            htmlFor=""
            className="btn-search-label"
          >
            <input
              className="search-submit"
              data-testid="search-artist-button"
              type="submit"
              value="Search"
              disabled={ statusBtn }
              onClick={ this.handleClick }
            />
          </label>
        </form>
        <section className="albums-container">
          { loading && <Loading showDefaultBackground={ false } /> }
          { !loading && albums.length > 0 && (
            <>
              <p className="result-title">{`Albums result for ${artistName}:`}</p>
              <section
                className="album-cards-container"
              >
                {albums.map((album) => (
                  <div
                    className="album-info"
                    key={ album.collectionId }
                  >
                    <Link
                      className="album-card"
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <img
                        className="album-image"
                        src={ album.artworkUrl100 }
                        alt={ album.collectionName }
                      />
                    </Link>
                    <section className="album-name-container">
                      <span className="album-name">{album.collectionName}</span>
                      <span className="album-authors">{album.artistName}</span>
                    </section>
                  </div>
                ))}
              </section>
            </>
          )}
          {!loading && albums.length === 0 && wasItResearched && (
            <section className="not-found-message-container">
              <img src={ circleErrorIcon } alt="album not found icon" />
              <span
                className="not-found-message"
              >
                {messageAlbumNotFound}
              </span>
            </section>
          )}
        </section>
      </div>
    );
  }
}

export default Search;

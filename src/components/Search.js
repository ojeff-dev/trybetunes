import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: 'Nome do Artista',
      statusBtn: true,
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

  render() {
    const { statusBtn, inputValue } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="">
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder={ inputValue }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="">
            <input
              data-testid="search-artist-button"
              type="submit"
              value="Pesquisar"
              disabled={ statusBtn }
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Search;

import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingHeader from './LoadingHeader';

import '../styles/components/header.css';
import profileIcon from '../images/profile-icon.png';
import searchIcon from '../images/search-icon.png';
import favoriteIcon from '../images/favorite-icon.png';
import trybetunesLogo from '../images/trybetunes-logo.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
      userImage: '',
    };
  }

  async componentDidMount() {
    const { name, image } = await getUser();
    this.setState({
      loading: false,
      userName: name,
      userImage: image,
    });
  }

  render() {
    const { loading, userName, userImage } = this.state;
    return (
      <header data-testid="header-component" className="header-container">
        <nav className="nav-container">
          <img
            className="nav-logo"
            src={ trybetunesLogo }
            alt="Trybetunes logo"
          />
          <section className="nav-links">
            <Link
              to="/search"
              data-testid="link-to-search"
              className="link-element"
            >
              <img src={ searchIcon } alt="magnifying glass icon" />
              <span>Search</span>
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              className="link-element"
            >
              <img src={ favoriteIcon } alt="star icon" />
              <span>Favorites</span>
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              className="link-element"
            >
              <img src={ profileIcon } alt="user profile icon" />
              <span>Profile</span>
            </Link>
          </section>
          {
            loading ? <LoadingHeader /> : (
              <section className="userName-header-container">
                <img
                  src={ userImage || profileIcon }
                  alt={ `${userName} profile icon` }
                  className="user-profile-icon"
                />
                <span
                  data-testid="header-user-name"
                >
                  {`${userName}`}
                </span>
              </section>
            )
          }
        </nav>
      </header>
    );
  }
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
    };
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ loading: false, userName: name });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading />
            : (
              <nav>
                <p data-testid="header-user-name">{`Usuário: ${userName}`}</p>
                <section className="LinksHeader">
                  <Link
                    to="/search"
                    data-testid="link-to-search"
                  >
                    Search
                  </Link>
                  <Link
                    to="/favorites"
                    data-testid="link-to-favorites"
                  >
                    Favorites
                  </Link>
                  <Link
                    to="/profile"
                    data-testid="link-to-profile"
                  >
                    Profile
                  </Link>
                </section>
              </nav>
            )
        }
      </header>
    );
  }
}

export default Header;

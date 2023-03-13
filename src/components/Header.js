import React from 'react';
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
              <p data-testid="header-user-name">{`Usuário: ${userName}`}</p>
            )
        }
      </header>
    );
  }
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      infoUser: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ infoUser: [user], loading: false });
    console.log(user);
  }

  render() {
    const { infoUser, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          infoUser.map((user, index) => (
            <section key={ index }>
              <img
                data-testid="profile-image"
                src={ user.image }
                alt="Foto de perfil"
              />
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </section>
          ))
        )}
      </div>
    );
  }
}

export default Profile;

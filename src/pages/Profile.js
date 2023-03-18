import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

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
    this.setState({ infoUser: user, loading: false });
  }

  render() {
    const { infoUser: { name, email, image, description }, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <section>
            <img
              data-testid="profile-image"
              src={ image }
              alt="Foto de perfil"
            />
            <p>{name}</p>
            <p>{email}</p>
            <p>{description}</p>
            <div>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;

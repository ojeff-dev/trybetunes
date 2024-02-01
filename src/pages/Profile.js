import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

import '../styles/profile.css';
import defaultProfileIcon from '../images/default-profile-icon.png';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      infoUser: '',
      isImageAvailable: false,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ infoUser: user, loading: false }, () => {
      this.checkImageAvailability(user.image);
    });
  }

  checkImageAvailability = (imageUrl) => {
    const img = new Image();

    img.onload = () => {
      this.setState({ isImageAvailable: true });
    };

    img.onerror = () => {
      this.setState({ isImageAvailable: false });
    };

    img.src = imageUrl;
  };

  render() {
    const {
      infoUser: { name, email, image, description },
      loading, isImageAvailable,
    } = this.state;
    return (
      <div data-testid="page-profile" className="page-profile-container">
        <Header />
        <section className="blue-background-profile" />
        <section className="profile-section-container">
          {loading && (
            <Loading showDefaultBackground={ false } />
          )}

          {!loading && (
            <section className="profile-content-container">
              <section className="profile-image-container">
                <img
                  className="profile-image"
                  data-testid="profile-image"
                  src={ isImageAvailable ? image : defaultProfileIcon }
                  alt="Foto de perfil"
                />
              </section>
              <section className="user-name-info-container">
                <div className="user-name-info-box">
                  <span className="user-name-content-subtitle">
                    Your name
                  </span>
                  <span className="user-name-content-text">
                    {name}
                  </span>
                </div>
                <div className="user-name-info-box">
                  <span className="user-name-content-subtitle">
                    E-mail
                  </span>
                  <span className="user-name-content-text">
                    {email || 'your_email@email.com'}
                  </span>
                </div>
                <div className="user-name-info-box">
                  <span className="user-name-content-subtitle">
                    Description
                  </span>
                  <span className="user-name-content-text">
                    {description || 'your description'}
                  </span>
                </div>
                <div
                  className="user-name-info-box profile-btn-container"
                >
                  <Link
                    to="/profile/edit"
                    className="profile-edit-btn"
                  >
                    Edit Profile
                  </Link>
                </div>
              </section>
            </section>
          )}
        </section>
      </div>
    );
  }
}

export default Profile;

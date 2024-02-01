import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

import defaultProfileIcon from '../images/default-profile-icon.png';

import '../styles/profileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      userInfo: '',
      loading: true,
      statusBtn: true,
      isSaved: false,
      isImageAvailable: false,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ userInfo: user, loading: false }, () => {
      const { userInfo: { name, email, description, image } } = this.state;

      if (
        name.length > 0
        && email.length > 0
        && description.length > 0
      ) {
        this.setState({ statusBtn: false });
      }

      this.checkImageAvailability(image);
    });
  }

  handleChange = ({ target }) => {
    this.setState((prevState) => ({
      userInfo: { ...prevState.userInfo, [target.name]: target.value },
    }), () => {
      const { userInfo: { name, email, description, image } } = this.state;

      if (
        name.length > 0
        && email.length > 0
        && validator.isEmail(email)
        && description.length > 0
      ) {
        this.checkImageAvailability(image);
        this.setState({ statusBtn: false });
      } else {
        this.setState({ statusBtn: true });
      }
    });
  };

  handleClick = (event) => {
    event.preventDefault();

    this.setState({ loading: true, isSaved: true }, async () => {
      const { userInfo } = this.state;
      await updateUser(userInfo);
      const { history } = this.props;
      history.push('/profile');
    });
  };

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
      loading, userInfo, statusBtn,
      isSaved, isImageAvailable,
    } = this.state;

    return (
      <div
        data-testid="page-profile-edit"
        className="page-profile-edit-container"
      >
        <Header />
        <section className="blue-background-profile-edit" />
        {
          loading ? <Loading showDefaultBackground={ false } />
            : (
              <section className="profile-edit-content-container">
                <section className="profile-edit-image-container">
                  <img
                    className="profile-image"
                    src={
                      isSaved && isImageAvailable
                        ? userInfo.image : defaultProfileIcon
                    }
                    alt={ `${userInfo.name} icon` }
                  />
                  <label
                    htmlFor="image-link"
                    className="profile-edit-label-image"
                  >
                    <input
                      className="profile-edit-input-image"
                      type="text"
                      name="image"
                      id="image-link"
                      data-testid="edit-input-image"
                      placeholder="Insert link to image"
                      value={ userInfo.image }
                      onChange={ this.handleChange }
                    />
                  </label>
                </section>
                <form className="profile-edit-form">
                  <label
                    htmlFor="name"
                    className="profile-edit-form-label"
                  >
                    <span className="profile-edit-form-label-subtile">
                      Name
                    </span>
                    <span className="profile-edit-form-label-note">
                      Feel free to use your social name
                    </span>
                    <input
                      data-testid="edit-input-name"
                      className="profile-edit-form-input"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={ userInfo.name }
                      onChange={ this.handleChange }
                    />
                  </label>
                  <label
                    htmlFor="email"
                    className="profile-edit-form-label"
                  >
                    <span className="profile-edit-form-label-subtile">
                      Email
                    </span>
                    <span className="profile-edit-form-label-note">
                      Choose your best email
                    </span>
                    <input
                      className="profile-edit-form-input"
                      type="email"
                      name="email"
                      placeholder="your_email@email.com"
                      data-testid="edit-input-email"
                      value={ userInfo.email }
                      onChange={ this.handleChange }
                    />
                  </label>
                  <label
                    htmlFor="description"
                    className="profile-edit-form-label"
                  >
                    <span className="profile-edit-form-label-subtile">
                      Description
                    </span>
                    <textarea
                      className="profile-edit-form-textarea"
                      name="description"
                      placeholder="About you..."
                      data-testid="edit-input-description"
                      value={ userInfo.description }
                      onChange={ this.handleChange }
                    />
                  </label>
                  <label className="btn-profile-edit-label">
                    <input
                      className="btn-profile-edit-submit"
                      type="submit"
                      value="Save"
                      data-testid="edit-button-save"
                      disabled={ statusBtn }
                      onClick={ this.handleClick }
                    />
                  </label>
                </form>
              </section>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;

import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      userInfo: '',
      loading: true,
      statusBtn: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ userInfo: user, loading: false });
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
        && image.length > 0
      ) {
        this.setState({ statusBtn: false });
      } else {
        this.setState({ statusBtn: true });
      }
    });
  };

  handleClick = (event) => {
    event.preventDefault();

    this.setState({ loading: true }, async () => {
      const { userInfo } = this.state;
      await updateUser(userInfo);
      const { history } = this.props;
      history.push('/profile');
    });
  };

  render() {
    const {
      loading, userInfo, statusBtn,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading ? <Loading />
            : (
              <form className="FormProfile">
                <label htmlFor="">
                  Nome do usuário
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="name"
                    value={ userInfo.name }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="">
                  Email:
                  <input
                    type="email"
                    name="email"
                    data-testid="edit-input-email"
                    value={ userInfo.email }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="">
                  Descrição:
                  <textarea
                    name="description"
                    data-testid="edit-input-description"
                    value={ userInfo.description }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="">
                  URL Imagem:
                  <input
                    type="text"
                    name="image"
                    data-testid="edit-input-image"
                    value={ userInfo.image }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="">
                  <input
                    type="submit"
                    value="Salvar"
                    data-testid="edit-button-save"
                    disabled={ statusBtn }
                    onClick={ this.handleClick }
                  />
                </label>
              </form>
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

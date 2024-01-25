import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: { name: '' },
      statusBtn: true,
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ inputValue: { name: target.value } });

    const characterMin = 3;
    if (target.value.length >= characterMin) {
      this.setState({ statusBtn: false });
    } else {
      this.setState({ statusBtn: true });
    }
  };

  handleClick = (event) => {
    event.preventDefault();

    // habilita o loading após o click no botão
    this.setState({ loading: true }, async () => {
      const { inputValue } = this.state;
      await createUser(inputValue);
      this.setState({ loading: false });

      // desabilita o loading após conclusão da promise e muda de página
      const { history } = this.props;
      history.push('/search');
    });
  };

  render() {
    const { statusBtn, loading } = this.state;

    return (
      <div style={ { width: '100%', height: '100%' } }>
        {loading ? (
          <Loading />
        ) : (
          <div data-testid="page-login" className="login-container">
            <form className="login-form">
              <img
                src="trybetunes-logo.png"
                alt="Trybetunes logo"
                className="login-logo"
              />
              <label htmlFor="username">
                <input
                  className="login-input"
                  type="text"
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                  placeholder="Qual é o seu nome ?"
                  id="username"
                  name="username"
                />
              </label>
              <input
                className="login-submit"
                disabled={ statusBtn }
                data-testid="login-submit-button"
                type="submit"
                value="Entrar"
                onClick={ this.handleClick }
              />
            </form>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

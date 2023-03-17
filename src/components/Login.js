import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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
      /* const { inputValue: { name } } = this.state;
      const userInfo = {
        name: `${name}`,
        email: 'jeff-ds@outlook.com',
        description: 'Minha descrição: 😄',
      }; */
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
      <div data-testid="page-login">
        {
          loading ? <Loading />
            : (
              <form>
                <label htmlFor="">
                  Nome de usuário
                  <input
                    type="text"
                    data-testid="login-name-input"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="">
                  <input
                    disabled={ statusBtn }
                    data-testid="login-submit-button"
                    type="submit"
                    value="Entrar"
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

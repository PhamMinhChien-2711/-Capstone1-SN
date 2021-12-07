import { useContext, useRef } from "react";
import "./login.scss";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import loginImg from '../../assets/login-image.jpg';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  const handleCreateAcc = () => {
    history.push('/register')
  }
  return (
    <div className="login">
      <div className="login-left">
        <img src={loginImg} alt='' className='login-left__image' />
      </div>
      <div className="login-right">
        <h3 className="login-right__logo">SNPO</h3>
        <span className="login-right__description">
          Connect with other pet owers around you on SNPO social.
        </span>
        <form className="login-right__form" onSubmit={handleClick}>
          <input
            placeholder="Email"
            type="email"
            required
            className="login-right__form__input"
            ref={email}
          />
          <input
            placeholder="Password"
            type="password"
            required
            minLength="6"
            className="login-right__form__input"
            ref={password}
          />
          <button className="login-right__form__buttonLogin" type="submit" disabled={isFetching}>
            {isFetching ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "Log In"
            )}
          </button>
          <span className="login-right__form__buttonForgot">Forgot Password?</span>

          <button className="login-right__form__buttonCreate" onClick={handleCreateAcc}>
            {isFetching ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "Or Create an Account"
            )}
          </button>

        </form>
      </div>

    </div>
  );
}

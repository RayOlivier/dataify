import './Login.scss';

const LOGIN_URI = 'https://dataify.onrender.com/login'; // guessing uri for now
// const LOGIN_URI = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/login' : 'https://dataify.onrender.com/login'; // guessing uri for now

export const Login = () => (
  <div className="login__container">
    <a className="login__button" href={LOGIN_URI}>
      Log in to Spotify
    </a>
  </div>
);

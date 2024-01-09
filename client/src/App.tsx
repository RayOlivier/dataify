import { useEffect, useState } from 'react';
import { accessToken, logout } from './api/spotify';
import './App.scss';

function App() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <>
      <h1>Spotify App, name TBD</h1>
      {!token ? (
        <div>
          <a href="http://localhost:8080/login">Log in to Spotify</a>
        </div>
      ) : (
        <>
          <div>Logged in</div>
          <button onClick={logout}>Log out</button>
        </>
      )}
    </>
  );
}

export default App;

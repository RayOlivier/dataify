import { useEffect, useState } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './api/spotify';
import './App.scss';
import { Profile } from './types/types';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setToken(accessToken);
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    // TODO error catch HOF
    fetchData();
  }, []);

  return (
    <>
      {!token ? (
        <div>
          <a href="http://localhost:8080/login">Log in to Spotify</a>
        </div>
      ) : (
        <>
          <button onClick={logout}>Log out</button>
          {profile && (
            <div>
              <h1>{profile.display_name}</h1>
              <p>{profile.followers?.total} Followers</p>
              {profile.images.length && profile.images[0].url && <img src={profile.images[0].url} alt="Avatar" />}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;

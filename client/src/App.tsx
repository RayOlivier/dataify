import { useEffect, useState } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './api/spotify';
import './App.scss';
import { TProfile } from './types/types';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Login } from './components';
import { Profile } from './pages';
import { TopArtists } from './pages/top-artists/TopArtists';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<TProfile | null>(null);

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
    if (accessToken) {
      fetchData();
    }
  }, []);

  return (
    <>
      {!token ? (
        <Login></Login>
      ) : (
        <>
          <nav>
            <button className="logout" onClick={logout}>
              Log Out
            </button>
          </nav>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/top-artists" element={<TopArtists></TopArtists>}></Route>
              <Route path="/top-tracks" element={<h1>Top Tracks</h1>}></Route>
              <Route path="/playlists/:id" element={<h1>Playlist</h1>}></Route>
              <Route path="/playlists" element={<h1>PLaylists</h1>}></Route>
              <Route
                path="/"
                element={
                  <>
                    {profile && (
                      <div>
                        <Profile />
                      </div>
                    )}
                  </>
                }></Route>
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;

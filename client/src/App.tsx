import { useEffect, useState } from 'react';
import { accessToken, getCurrentUserProfile } from './api/spotify';
import './App.scss';
import { TProfile } from './types/types';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from './components';
import { Landing, Playlist, Playlists, Profile, TopTracks } from './pages';
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
      } catch (error) {
        console.error(error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, []);

  return (
    <>
      {!token ? (
        <Landing />
      ) : (
        <>
          <Router>
            <ScrollToTop />
            <Nav></Nav>
            <Routes>
              <Route path="/top-artists" element={<TopArtists></TopArtists>}></Route>
              <Route path="/top-tracks" element={<TopTracks></TopTracks>}></Route>
              <Route path="/playlists/:id" element={<Playlist></Playlist>}></Route>
              <Route path="/playlists" element={<Playlists></Playlists>}></Route>
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

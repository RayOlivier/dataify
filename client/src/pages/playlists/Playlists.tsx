import { useEffect, useState } from 'react';
import { TPlaylist, TPlaylistData } from '../../types/types';
import { getCurrentUserPlaylists } from '../../api/spotify';
import { PlaylistCard } from '../../components';
import axios from 'axios';

export const Playlists = () => {
  const [playlists, setPlaylists] = useState<TPlaylist[]>([]);
  const [playlistsData, setPlaylistsData] = useState<TPlaylistData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPlaylists = await getCurrentUserPlaylists();

        setPlaylistsData(userPlaylists.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // When playlistsData updates, check if there are more playlists to fetch
  // then update the state variable
  useEffect(() => {
    if (!playlistsData) {
      return;
    }

    const fetchMoreData = async () => {
      console.log('fetching more!');
      if (playlistsData.next) {
        try {
          const { data } = await axios.get(playlistsData.next);
          setPlaylistsData(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    // functional update to update playlists state variable to avoid including playlists as a dependency for this hook and creating an infinite loop
    setPlaylists(playlists => [...(playlists ? playlists : []), ...playlistsData.items]);

    // Fetch next set of playlists as needed
    fetchMoreData();
  }, [playlistsData]);

  return (
    <main>
      <h2>Playlists</h2>
      {playlists && (
        <div className="section playlists">
          {playlists.length}
          <ul className="playlist-list">
            {playlists.map(playlist => (
              <PlaylistCard playlist={playlist} key={playlist.name + playlist.id}></PlaylistCard>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

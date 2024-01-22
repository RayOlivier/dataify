import { useEffect, useState } from 'react';
import { TPlaylist } from '../../types/types';
import { getCurrentUserPlaylists } from '../../api/spotify';
import { PlaylistCard } from '../../components';

export const Playlists = () => {
  const [playlists, setPlaylists] = useState<TPlaylist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPlaylists = await getCurrentUserPlaylists();

        setPlaylists(userPlaylists.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // @TODO fetch more playlists with pagination
  }, []);

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

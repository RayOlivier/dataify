import { useState, useEffect } from 'react';
import { getCurrentUserPlaylists, getCurrentUserProfile, getTopItems } from '../../api/spotify';
import { TArtist, TPlaylist, TProfile, TTrack } from '../../types/types';
import { ArtistCard, Header, PlaylistCard, TrackCard } from '../../components';
import './Profile.scss';

const Profile = () => {
  const [profile, setProfile] = useState<TProfile | null>(null);
  const [topArtists, setTopArtists] = useState<TArtist[] | null>(null);
  const [topTracks, setTopTracks] = useState<TTrack[]>([]);
  const [playlists, setPlaylists] = useState<TPlaylist[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        const fullProfile = userProfile.data;

        const userPlaylists = await getCurrentUserPlaylists();
        fullProfile.playlists = userPlaylists.data;

        const topArtists = await getTopItems({ type: 'artists', time_range: 'short_term' });
        const topTracks = await getTopItems({ type: 'tracks', time_range: 'short_term' });
        console.log('topTracks', topTracks);

        setProfile(fullProfile);
        setTopArtists(topArtists.data.items as TArtist[]);
        setTopTracks(topTracks.data.items as TTrack[]);
        setPlaylists(userPlaylists.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="profile">
      {profile && <Header profile={profile} />}
      {topArtists && (
        <div className="section artists">
          <h2>Top artists this month</h2>
          <ul className="artist-list">
            {topArtists.map(artist => (
              <ArtistCard name={artist.name} images={artist.images} key={artist.id}></ArtistCard>
            ))}
          </ul>
        </div>
      )}
      {topTracks && (
        <div className="section tracks">
          <h2>Top tracks this month</h2>
          <ul className="track-list">
            {topTracks.map((track, i) => (
              <TrackCard track={track} num={i + 1} key={track.id}></TrackCard>
            ))}
          </ul>
        </div>
      )}
      {playlists && (
        <div className="section artists">
          <h2>Playlists</h2>
          <ul className="artist-list">
            {playlists.map(playlist => (
              <PlaylistCard playlist={playlist} key={playlist.id}></PlaylistCard>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
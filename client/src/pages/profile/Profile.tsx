import { useState, useEffect } from 'react';
import { getCurrentUserPlaylists, getCurrentUserProfile } from '../../api/spotify';
import { TProfile } from '../../types/types';
import { Header } from '../../components';
// import { getCurrentUserProfile } from '../spotify';

const Profile = () => {
  const [profile, setProfile] = useState<TProfile | null>(null);
  // const [playlists, setPlaylists] = useState<TCurrentUserPlaylistData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        const fullProfile = userProfile.data;

        const userPlaylists = await getCurrentUserPlaylists();
        fullProfile.playlists = userPlaylists.data;

        console.log('fullProfile', fullProfile);
        setProfile(fullProfile);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <>{profile && <Header profile={profile} />}</>;
};

export default Profile;

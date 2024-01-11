import { useState, useEffect } from 'react';
import { getCurrentUserProfile } from '../../api/spotify';
import { TProfile } from '../../types/types';
import { Header } from '../../components';
// import { getCurrentUserProfile } from '../spotify';

const Profile = () => {
  const [profile, setProfile] = useState<TProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {profile && (
        // <div>
        //   <h1>{profile.display_name}</h1>
        //   <p>{profile.followers?.total} Followers</p>
        //   {profile.images.length && profile.images[0].url && <img src={profile.images[0].url} alt="Avatar" />}
        // </div>
        <Header profile={profile} />
      )}
    </>
  );
};

export default Profile;

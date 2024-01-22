import React from 'react';
import { TPlaylist, TProfile } from '../../types/types';
import './Header.scss';

type THeaderProps = {
  profile?: TProfile;
  playlist?: TPlaylist;
};

export const Header: React.FC<THeaderProps> = ({ profile, playlist }) => {
  return (
    <div className="header">
      {profile ? (
        <div className="header__inner">
          {profile.images.length && profile.images[0].url && <img className="header__img header__img--profile" src={profile.images[0].url} alt="Avatar" />}
          <div>
            <div className="header__overline">Profile</div>
            <h1 className="header__name">{profile.display_name}</h1>
            <p className="header__meta">
              {profile.playlists && (
                <span>
                  {profile.playlists.total} Playlist{profile.playlists.total !== 1 ? 's' : ''}
                </span>
              )}
              <span>
                {profile.followers?.total} Follower{profile.followers?.total !== 1 ? 's' : ''}
              </span>
            </p>
          </div>
        </div>
      ) : playlist ? (
        <div className="header__inner">
          {playlist.images.length && playlist.images[0].url && <img className="header__img" src={playlist.images[0].url} alt="Avatar" />}
          <div>
            <div className="header__overline">playlist</div>
            <h1 className="header__name">{playlist.name}</h1>
            <p className="header__meta">
              <span>
                {playlist.followers.total} Follower{playlist.followers.total !== 1 ? 's' : ''}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div>No playlist or profile to display</div>
      )}
    </div>
  );
};

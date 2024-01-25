import React from 'react';
import { TPlaylist } from '../../types/types';
import './PlaylistCard.scss';
import { Link } from 'react-router-dom';

type TPlaylistCardProps = {
  playlist: TPlaylist;
};

export const PlaylistCard: React.FC<TPlaylistCardProps> = ({ playlist }) => {
  const { name, images } = playlist;
  return (
    <li className="playlist-card">
      <Link to={`/playlists/${playlist.id}`}>
        {images && images[0] && (
          <div className="playlist-card__image">
            <img src={images[0].url} alt="" />
          </div>
        )}
        <h3 className="playlist-card__name">{name}</h3>
      </Link>
    </li>
  );
};

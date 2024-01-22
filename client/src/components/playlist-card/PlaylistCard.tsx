import React from 'react';
import { TPlaylist } from '../../types/types';
import './PlaylistCard.scss';

type TPlaylistCardProps = {
  playlist: TPlaylist;
};

const PlaylistCard: React.FC<TPlaylistCardProps> = ({ playlist }) => {
  const { name, images } = playlist;
  return (
    <li className="playlist-card">
      {images && images[0] && (
        <div className="playlist-card__image">
          <img src={images[0].url} alt="" />
        </div>
      )}
      <h3 className="playlist-card__name">{name}</h3>
    </li>
  );
};

export default PlaylistCard;

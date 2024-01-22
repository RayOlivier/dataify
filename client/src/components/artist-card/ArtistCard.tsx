import React from 'react';
import { TSpotifyImage } from '../../types/types';
import './ArtistCard.scss';

type TArtistCardProps = {
  name: string;
  images?: TSpotifyImage[];
};

export const ArtistCard: React.FC<TArtistCardProps> = ({ name, images }) => {
  return (
    <li className="artist-card">
      {images && images[0] && (
        <div className="artist-card__image">
          <img src={images[0].url} alt="" />
        </div>
      )}
      <h3 className="artist-card__name">{name}</h3>
    </li>
  );
};

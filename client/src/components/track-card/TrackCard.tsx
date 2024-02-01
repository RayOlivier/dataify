import React, { ReactNode } from 'react';
import { TTrack } from '../../types/types';
import './TrackCard.scss';
import { formatDuration } from '../../utils';
import { SpotifyButton } from '../spotify-button/SpotifyButton';

type TTrackCardProps = {
  track: TTrack;
  num?: number;
  children?: ReactNode;
};

export const TrackCard: React.FC<TTrackCardProps> = ({ track, num, children }) => {
  return (
    <li className="track-card">
      <div className="track-card__left">
        {num && <div className="track-card__num">{num}</div>}
        {track.album.images && track.album.images[0] && (
          <div className="track-card__image">
            <img src={track.album.images[0].url} alt="" />
          </div>
        )}
        <span className="track-card__info">
          <div className="track-card__title">{track.name}</div>
          <div className="track-card__subtitle">
            <span className="track-card__artists">{track.artists.map(artist => artist.name)}</span> - {track.album.name}
          </div>
          <SpotifyButton destination={track.external_urls.spotify} size="sm"></SpotifyButton>
        </span>
      </div>

      {children && children}

      <div className="track-card__duration">{formatDuration(track.duration_ms)}</div>
    </li>
  );
};

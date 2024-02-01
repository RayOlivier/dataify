import { Link } from 'react-router-dom';
import logo from '../../assets/Spotify_Icon_RGB_Green.png';
import './SpotifyButton.scss';

type TSpotifyButtonProps = {
  destination: string;
  size?: 'sm' | 'md';
};

export const SpotifyButton: React.FC<TSpotifyButtonProps> = ({ destination, size = 'md' }) => {
  return (
    <Link className={`spotify-button spotify-button--${size}`} to={destination} target="_blank">
      <img className="spotify-button__logo" src={logo} alt="" />
      <span className="spotify-button__text">{size === 'md' ? 'Listen on Spotify' : 'Open Spotify'}</span>
    </Link>
  );
};

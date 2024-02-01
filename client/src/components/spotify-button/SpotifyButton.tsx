import { Link } from 'react-router-dom';
import logo from '../../assets/Spotify_Icon_RGB_Green.png';
import './SpotifyButton.scss';

type TSpotifyButtonProps = {
  destination: string;
};

export const SpotifyButton: React.FC<TSpotifyButtonProps> = ({ destination }) => {
  return (
    <Link className="spotify-button" to={destination} target="_blank">
      <img className="spotify-button__logo" src={logo} alt="" />
      <span className="spotify-button__text">Listen on Spotify</span>
    </Link>
  );
};

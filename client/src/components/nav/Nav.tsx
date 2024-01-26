import { logout } from '../../api/spotify';
import { NavLink } from 'react-router-dom';
import { PiMicrophoneStageFill, PiMusicNotesFill, PiPlaylistFill, PiSignOut, PiUserFill } from 'react-icons/pi';

import './Nav.scss';

export const Nav = () => {
  const iconSize = '24px';
  return (
    <nav className="nav">
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink to="/">
            <PiUserFill size={iconSize} />
            <div className="nav-item__name">Profile</div>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/playlists">
            <PiPlaylistFill size={iconSize} />

            <div className="nav-item__name">Playlists</div>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/top-artists">
            <PiMicrophoneStageFill size={iconSize} />

            <div className="nav-item__name">Top Artists</div>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/top-tracks">
            <PiMusicNotesFill size={iconSize} />
            <div className="nav-item__name">Top Tracks</div>
          </NavLink>
        </li>
        <li className="nav-item">
          <div className="nav-item__container" onClick={logout}>
            <PiSignOut size={iconSize} />
            <div className="nav-item__name">Log Out</div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

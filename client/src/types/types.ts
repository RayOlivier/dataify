export interface TProfile {
  display_name: string;
  followers?: {
    total: number;
  };
  images: TSpotifyImage[];
}

export interface TAuthorizedUser {
  name: string;
  email: string;
  picture?: string | null;
  // image?: string | null;
  accessToken: string;
  sub: string;
  expires_at: number;
}

export interface TSpotifyImage {
  height: number;
  url: string;
  width: number;
}

export interface TCategory {
  id: string;
  name: string;
  icons: TSpotifyImage[];
}

export interface TAlbum {
  id: string;
  name: string;
  artists: TArtist[];
  images: TSpotifyImage[];
  album_type?: string;
  release_date: string;
  tracks: {
    total: number;
    items: TTrack[];
  };
}

export interface TArtist {
  id: string;
  name: string;
  images: TSpotifyImage[];
  followers?: {
    total: number;
  };
  genres?: string[];
}

export interface TTrack {
  id: string;
  name: string;
  album: TAlbum;
  artists: TArtist[];
  duration_ms: number;
  preview_url: string;
  href: string;
}

export interface TPlaylistTrack {
  added_at: string;
  added_by: string;
  track: TTrack;
}

export interface TPlaylist {
  description?: string;
  id: string;
  followers: {
    total: number;
  };
  images: TSpotifyImage[];
  name: string;
  owner: {
    id: string;
    display_name?: string;
  };
  // items?: [{ added_at: string; track: Track }];
  tracks: {
    items: TPlaylistTrack[];
    total: number;
  };
  type: string;
  total?: number;
}

export interface TPlaylistCard {
  description?: string;
  id: string;
  images: TSpotifyImage[];
  name: string;
}

export interface TSearchResults {
  albums?: {
    items: TAlbum[];
  };
  artists?: {
    items: TArtist[];
  };
  playlists?: {
    items: TPlaylist[];
  };
  tracks?: {
    items: TTrack[];
  };
}

export interface TTrackAnalysis {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: 1 | 0;
  speechiness: number;
  tempo: number;
  valence: number;
}

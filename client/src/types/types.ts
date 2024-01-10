export interface Profile {
  display_name: string;
  followers?: {
    total: number;
  };
  images: SpotifyImage[];
}

export interface AuthorizedUser {
  name: string;
  email: string;
  picture?: string | null;
  // image?: string | null;
  accessToken: string;
  sub: string;
  expires_at: number;
}

export interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}

export interface Category {
  id: string;
  name: string;
  icons: SpotifyImage[];
}

export interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: SpotifyImage[];
  album_type?: string;
  release_date: string;
  tracks: {
    total: number;
    items: Track[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images: SpotifyImage[];
  followers?: {
    total: number;
  };
  genres?: string[];
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  duration_ms: number;
  preview_url: string;
  href: string;
}

export interface PlaylistTrack {
  added_at: string;
  added_by: string;
  track: Track;
}

export interface Playlist {
  description?: string;
  id: string;
  // followers: {
  //   total: number;
  // };
  images: SpotifyImage[];
  name: string;
  owner: {
    id: string;
    display_name?: string;
  };
  // items?: [{ added_at: string; track: Track }];
  tracks: {
    items: PlaylistTrack[];
    total: number;
  };
  type: string;
  total?: number;
}

export interface PlaylistCard {
  description?: string;
  id: string;
  images: SpotifyImage[];
  name: string;
}

export interface SearchResults {
  albums?: {
    items: Album[];
  };
  artists?: {
    items: Artist[];
  };
  playlists?: {
    items: Playlist[];
  };
  tracks?: {
    items: Track[];
  };
}

export interface TrackAnalysis {
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

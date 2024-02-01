import axios, { AxiosResponse } from 'axios';
import { hasDurationTimePassed } from '../utils/time/time';
import {
  TAudioFeaturesData,
  TCurrentUserPlaylistData,
  TGeneralReq,
  TPlaylist,
  TPlaylistTracks,
  TProfile,
  TUserTopItemsData,
  TUserTopItemsReq
} from '../types/types';
import queryString from 'query-string';

interface localStorage {
  [key: string]: string;
}

const LOCALSTORAGE_KEYS: localStorage = {
  localAccessToken: 'spotify_access_token',
  localRefreshToken: 'spotify_refresh_token',
  tokenDuration: 'spotify_token_duration',
  tokenTimestamp: 'spotify_token_timestamp'
};

const LOCALSTORAGE_VALUES = {
  localAccessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.localAccessToken),
  localRefreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.localRefreshToken),
  tokenDuration: window.localStorage.getItem(LOCALSTORAGE_KEYS.tokenDuration),
  tokenTimestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.tokenTimestamp)
};

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
  // Clear all localStorage items
  for (const key in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[key]);
  }
  // Navigate to homepage
  window.location.href = window.location.origin;
};

/**
 * Checks if the amount of time that has elapsed between the tokenTimestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
  const { localAccessToken, tokenTimestamp, tokenDuration } = LOCALSTORAGE_VALUES;
  if (!localAccessToken || !tokenTimestamp || !tokenDuration) {
    return false;
  }

  return hasDurationTimePassed(Date.now(), Number(tokenTimestamp), Number(tokenDuration));
};

const refreshAccessToken = async () => {
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !LOCALSTORAGE_VALUES.localRefreshToken ||
      LOCALSTORAGE_VALUES.localRefreshToken === 'undefined' ||
      Date.now() - Number(LOCALSTORAGE_VALUES.tokenTimestamp) / 1000 < 1000
    ) {
      console.error('No refresh token available');
      logout();
    }

    // Use `/refresh_token` endpoint from our Node app
    const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.localRefreshToken}`);

    // Update localStorage values
    window.localStorage.setItem(LOCALSTORAGE_KEYS.localAccessToken, data.access_token);
    window.localStorage.setItem(LOCALSTORAGE_KEYS.tokenTimestamp, String(Date.now()));

    // Reload the page for localStorage updates to be reflected
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

export const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const queryParams = {
    [LOCALSTORAGE_KEYS.localAccessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.localRefreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.tokenDuration]: urlParams.get('expires_in')
  };
  const error = urlParams.get('error');

  // log error and refresh token
  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If the token in localStorage has expired, refresh the token
  if (hasTokenExpired()) {
    console.warn('Access token has expired, attempting to refresh...');
    refreshAccessToken();
  }

  // use accessToken in local storage if it exists
  if (LOCALSTORAGE_VALUES.localAccessToken && LOCALSTORAGE_VALUES.localAccessToken !== 'undefined') {
    return LOCALSTORAGE_VALUES.localAccessToken;
  }

  // If there is an access token in the URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.localAccessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      const paramValue = queryParams[property];
      if (paramValue) {
        window.localStorage.setItem(property, paramValue);
      }
    }

    // Set timestamp
    window.localStorage.setItem(LOCALSTORAGE_KEYS.tokenTimestamp, String(Date.now()));
    // Return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.localAccessToken];
  }

  // fallback, should never get to this point
  console.error('getAccessToken end - NEED ELSE CASE');
  return null;
};

export const accessToken = getAccessToken();

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 */
export const getCurrentUserProfile = (): Promise<AxiosResponse<TProfile>> => axios.get('/me');

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
 */
export const getCurrentUserPlaylists = (limit = 50): Promise<AxiosResponse<TCurrentUserPlaylistData>> => {
  return axios.get(`/me/playlists?limit=${limit}`);
};

/**
 * Get a User's Top Artists or Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 * @param TUserTopItemsReq
 *
 * time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Default: 'medium_term'
 */
export const getTopItems = ({ type, time_range, limit = 50, offset }: TUserTopItemsReq): Promise<AxiosResponse<TUserTopItemsData>> => {
  const params = queryString.stringify({ time_range, limit, offset });
  return axios.get(`/me/top/${type}?${params}`);
};

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/get-playlist
 * @param {string} playlist_id - The Spotify ID for the playlist.
 */
export const getPlaylistById = (playlist_id: string): Promise<AxiosResponse<TPlaylist>> => {
  return axios.get(`/playlists/${playlist_id}`);
};

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/get-playlist
 * @param {string} playlist_id - The Spotify ID for the playlist.
 */
export const getPlaylistTracksById = ({ id, offset, limit = 50 }: TGeneralReq): Promise<AxiosResponse<TPlaylistTracks>> => {
  const params = queryString.stringify({ limit, offset });

  return axios.get(`/playlists/${id}/tracks?&${params}`);
};

/**
 * Get Audio Features for Several Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-audio-features
 * @param {string} ids - A comma-separated list of the Spotify IDs for the tracks
 */

export const getAudioFeaturesForTracks = (ids: string): Promise<AxiosResponse<TAudioFeaturesData>> => {
  return axios.get(`/audio-features?ids=${ids}`);
};

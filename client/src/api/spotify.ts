import axios from 'axios';
import { hasDurationTimePassed } from '../utils/time/time';

interface localStorageAuth {
  localAccessToken: string;
  localRefreshToken: string;
  tokenDuration: string;
  tokenTimestamp: string;
}

const LOCALSTORAGE_KEYS: localStorageAuth = {
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
  console.log('LOGGING OUT');
  // Clear all localStorage items
  for (const key in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[key as keyof localStorageAuth]);
  }
  // Navigate to homepage
  // window.location = window.location.origin;
  window.location.reload();
};

/**
 * Checks if the amount of time that has elapsed between the tokenTimestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
  console.log('checking token expired');
  const { localAccessToken, tokenTimestamp, tokenDuration } = LOCALSTORAGE_VALUES;
  if (!localAccessToken || !tokenTimestamp || !tokenDuration) {
    return false;
  }

  console.log('hasTokenExpired?', hasDurationTimePassed(Date.now(), Number(tokenTimestamp), Number(tokenDuration)));
  // return Date.now() - Number(tokenTimestamp) > Number(tokenDuration) * 1000;
  return hasDurationTimePassed(Date.now(), Number(tokenTimestamp), Number(tokenDuration));
};

const refreshAccessToken = async () => {
  console.log('refreshing token');
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !LOCALSTORAGE_VALUES.localRefreshToken ||
      LOCALSTORAGE_VALUES.localRefreshToken === 'undefined' ||
      Date.now() - Number(LOCALSTORAGE_VALUES.tokenTimestamp) / 1000 < 1000
    ) {
      console.error('No refresh token available');
      // logout();
    }

    // Use `/refresh_token` endpoint from our Node app
    const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.localRefreshToken}`);

    console.log('updating vals');
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
    console.log('returning existing token');
    return LOCALSTORAGE_VALUES.localAccessToken;
  }

  // If there is an access token in the URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.localAccessToken]) {
    console.log('first log in****');
    // Store the query params in localStorage
    for (const property in queryParams) {
      console.log('store params property', property);
      const paramValue = queryParams[property];
      if (paramValue) {
        window.localStorage.setItem(property, paramValue);
      }
    }

    console.log('SETTING TIMESTAMP');
    // Set timestamp
    window.localStorage.setItem(LOCALSTORAGE_KEYS.tokenTimestamp, String(Date.now()));
    // Return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.localAccessToken];
  }

  // fallback, should never get to this point
  console.log('fallback reached');
  return false;
};

export const accessToken = getAccessToken();
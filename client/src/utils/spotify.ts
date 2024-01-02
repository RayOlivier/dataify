const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accessToken = urlParams.get('access_token');
  const refreshToken = urlParams.get('refresh_token');

  console.log('access_token, refreshToken', accessToken, refreshToken);

  return accessToken;
};

export const accessToken = getAccessToken();

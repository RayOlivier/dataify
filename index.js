require('dotenv').config();
const express = require('express');
const querystring = require('querystring');

const app = express();
const axios = require('axios');
const port = 8080;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

app.get('/', (req, res) => {
  const data = {
    text: 'Hello World!'
  };
  res.json(data);
});

app.get('/test', (req, res) => {
  console.log('HIT TEST');
  const data = {
    text: 'Test successful!'
  };
  res.json(data);
});

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  const scope = ['user-read-private', 'user-read-email', 'user-top-read'].join(' ');

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req, res) => {
  // pull authorization code from Spotify's redirect
  const code = req.query.code || null;

  // POST to exchange authorization code for access token
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({ grant_type: 'authorization_code', code: code, redirect_uri: REDIRECT_URI }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    }
  })
    .then(response => {
      if (response.status === 200) {
        // testing refresh token route
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({ access_token, refresh_token, expires_in });

        //redirect to react app && pass token in query params
        res.redirect(`http://localhost:5173/?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: 'invalid token' })}`);
      }
    })
    .catch(error => {
      res.send(error);
    });
});

/**
 * Refresh the access token if it has expired
 */
app.get('/refresh_token', (req, res) => {
  const refresh_token = req.query.refresh_token;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Express app listening at  http://localhost:${port}`);
});

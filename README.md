# Spotify App

This is a portfolio piece that utitizes the Spotify API to show a user's profile and top listens.
NOTE: Currently pending a quota extension from Spotify to show a live demo.

## Tech used
React.js
Express.js
Node.js
Vite
Axios
OAuth

## Screenshots
![Screenshot of page displaying Top Artists](https://github.com/RayOlivier/spotify-project/blob/main/client/public/screenshots/artists.png)


## Running Locally

1. Register a Spotify App in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and add `http://localhost:8080/callback` as a Redirect URI in the app settings

2. Create a `.env` file at the root of the project based on `.env.example` and add your unique `CLIENT_ID` and `CLIENT_SECRET` from the Spotify dashboard


3. Install dependencies

    ```shell
    npm install
    ```

4. Run the React app with Vite on <http://localhost:5173> and the Node server on <http://localhost:8080>

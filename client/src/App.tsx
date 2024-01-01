import { useEffect, useState } from 'react';
import './App.scss';

function App() {
  console.log('app');

  // TEST proxy
  // const fetchData = async () => {
  //   console.log('fetching');

  //   try {
  //     const response = await fetch('/api/test'); // Replace '/api/data' with your API endpoint
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  // fetchData();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    console.log('access_token, refreshToken', accessToken, refreshToken);
  }, []);

  return (
    <>
      <div>
        <a href="http://localhost:8080/login">Log in to Spotify</a>
      </div>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;


import React from 'react';
import styles from './Spotify.module.scss';

const CLIENT_ID = '3480f05891fc44d5ad2b161451a47979'; 
const REDIRECT_URI = 'http://localhost:3000'; 

const Spotify: React.FC = () => {
  const handleLogin = () => {
    const scopes = 'user-library-read user-read-private';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  return (
    <div className={styles['spotify-container']}>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Spotify;

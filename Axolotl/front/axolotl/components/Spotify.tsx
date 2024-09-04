//add spotify redirect for user accsess token 
// import React from 'react';
// import styles from './Spotify.module.scss';

// const CLIENT_ID = '3480f05891fc44d5ad2b161451a47979'; 
// const REDIRECT_URI = 'http://localhost:3000'; 

// const Spotify: React.FC = () => {
//   const handleLogin = () => {
//     const scopes = 'user-library-read user-read-private';
//     const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
//     window.location.href = authUrl;
//   };

//   return (
//     <div className={styles['spotify-container']}>
//       <button onClick={handleLogin}>Login with Spotify</button>
//     </div>
//   );
// };

// export default Spotify;


//handle access token 
// import React, { useEffect, useState } from 'react';
// import styles from './Spotify.module.scss';

// const CLIENT_ID = '3480f05891fc44d5ad2b161451a47979'; 
// const REDIRECT_URI = 'http://localhost:3000'; 

// const Spotify: React.FC = () => {
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     // Get access token from URL hash
//     const hash = window.location.hash;
//     const params = new URLSearchParams(hash.substring(1));
//     const accessToken = params.get('access_token');
//     if (accessToken) {
//       setToken(accessToken);
//       window.history.replaceState({}, document.title, '/'); // Clean up URL
//     }
//   }, []);

//   const handleLogin = () => {
//     const scopes = 'user-library-read user-read-private';
//     const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
//     window.location.href = authUrl;
//   };

//   return (
//     <div className={styles['spotify-container']}>
//       {!token ? (
//         <button onClick={handleLogin}>Login with Spotify</button>
//       ) : (
//         <div>
//           <p>Logged in with Spotify</p>
//           {/* make API calls using the access token */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Spotify;


//spotify data fetch


import React, { useEffect, useState } from 'react';
import styles from './Spotify.module.scss';

const CLIENT_ID = '3480f05891fc44d5ad2b161451a47979'; 
const REDIRECT_URI = 'http://localhost:3000'; 

const Spotify: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    // Get access token from URL hash
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    if (accessToken) {
      setToken(accessToken);
      window.history.replaceState({}, document.title, '/'); // Clean up URL
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => setPlaylists(data.items))
        .catch(error => console.error('Error fetching playlists:', error));
    }
  }, [token]);

  const handleLogin = () => {
    const scopes = 'user-library-read user-read-private';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  return (
    <div className={styles['spotify-container']}>
      {!token ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <div>
          <p>Logged in with Spotify</p>
          <h2>Your Playlists</h2>
          <ul>
            {playlists.map(playlist => (
              <li key={playlist.id}>{playlist.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Spotify;

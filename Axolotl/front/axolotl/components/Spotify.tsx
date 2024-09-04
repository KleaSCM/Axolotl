import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import styles from '../styles/Spotify.module.scss';

const CLIENT_ID = '3480f05891fc44d5ad2b161451a47979';
const REDIRECT_URI = 'http://localhost:3000/callback';

declare global {
  interface Window {
    Spotify: any;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

const Spotify: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('spotify_token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      if (accessToken) {
        setToken(accessToken);
        localStorage.setItem('spotify_token', accessToken);
        window.history.replaceState({}, document.title, '/');
      }
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

      if (window.Spotify) {
        window.onSpotifyWebPlaybackSDKReady = () => {
          const newPlayer = new window.Spotify.Player({
            name: 'My Spotify Player',
            getOAuthToken: (cb: (token: string) => void) => {
              cb(token);
            },
            volume: 0.5,
          });

          newPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
            console.log('The Web Playback SDK is ready');
            setPlayer(newPlayer);
          });

          newPlayer.addListener('not_ready', () => {
            console.log('The Web Playback SDK is not ready');
          });

          newPlayer.connect();
        };
      } else {
        console.error('Spotify Web Playback SDK is not loaded');
      }
    }
  }, [token]);

  const handleLogin = () => {
    const scopes = 'playlist-read-private playlist-read-collaborative streaming user-read-playback-state user-modify-playback-state';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  const play = () => {
    if (player) {
      player.resume().catch((error: any) => console.error('Error playing:', error));
    }
  };

  const pause = () => {
    if (player) {
      player.pause().catch((error: any) => console.error('Error pausing:', error));
    }
  };

  const previousTrack = () => {
    if (player) {
      player.previousTrack().catch((error: any) => console.error('Error going to previous track:', error));
    }
  };

  const nextTrack = () => {
    if (player) {
      player.nextTrack().catch((error: any) => console.error('Error going to next track:', error));
    }
  };

  return (
    <div className={styles['spotify-container']}>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('Spotify Web Playback SDK loaded');
        }}
      />
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
          <div className={styles['controls']}>
            <button onClick={previousTrack}>Previous</button>
            <button onClick={play}>Play</button>
            <button onClick={pause}>Pause</button>
            <button onClick={nextTrack}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spotify;




// import React, { useEffect, useState } from 'react';
// import styles from '../styles/Spotify.module.scss';

// const CLIENT_ID = '3480f05891fc44d5ad2b161451a47979'; 
// const REDIRECT_URI = 'http://localhost:3000/callback'; 

// const Spotify: React.FC = () => {
//   const [token, setToken] = useState<string | null>(null);
//   const [playlists, setPlaylists] = useState<any[]>([]);

//   useEffect(() => {
//     // Check if token is in localStorage
//     const storedToken = localStorage.getItem('spotify_token');
//     if (storedToken) {
//       setToken(storedToken);
//     } else {
//       // Redirect to Spotify login if no token is present
//       const hash = window.location.hash;
//       const params = new URLSearchParams(hash.substring(1));
//       const accessToken = params.get('access_token');
//       if (accessToken) {
//         setToken(accessToken);
//         localStorage.setItem('spotify_token', accessToken);
//         window.history.replaceState({}, document.title, '/');
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       fetch('https://api.spotify.com/v1/me/playlists', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then(response => response.json())
//         .then(data => setPlaylists(data.items))
//         .catch(error => console.error('Error fetching playlists:', error));
//     }
//   }, [token]);

//   const handleLogin = () => {
//     const scopes = 'playlist-read-private playlist-read-collaborative';
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
//           <h2>Your Playlists</h2>
//           <ul>
//             {playlists.map(playlist => (
//               <li key={playlist.id}>{playlist.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Spotify;






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

// import React, { useEffect, useState } from 'react';
// import styles from '../styles/Spotify.module.scss';

// const CLIENT_ID = '3480f05891fc44d5ad2b161451a47979'; 
// const REDIRECT_URI = 'http://localhost:3000/callback'; 

// const Spotify: React.FC = () => {
//   const [token, setToken] = useState<string | null>(null);
//   const [playlists, setPlaylists] = useState<any[]>([]);

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

//   useEffect(() => {
//     if (token) {
//       fetch('https://api.spotify.com/v1/me/playlists', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then(response => response.json())
//         .then(data => setPlaylists(data.items))
//         .catch(error => console.error('Error fetching playlists:', error));
//     }
//   }, [token]);

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
//           <h2>Your Playlists</h2>
//           <ul>
//             {playlists.map(playlist => (
//               <li key={playlist.id}>{playlist.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Spotify;

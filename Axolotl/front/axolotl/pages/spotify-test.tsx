//Test page for spotify


// import React, { useState, useEffect } from 'react';

// // Define types for Track and PlaybackState
// interface Track {
//   id: string;
//   name: string;
//   artists: { name: string }[];
//   album: { images: { url: string }[] };
// }

// interface PlaybackState {
//   track_window: {
//     current_track: Track;
//   };
//   paused: boolean;
// }

// const SpotifyTest: React.FC = () => {
//   const [token, setToken] = useState<string | null>(null);
//   const [player, setPlayer] = useState<any>(null);
//   const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
//   const [isPaused, setIsPaused] = useState<boolean>(false);
//   const [playlists, setPlaylists] = useState<any[]>([]);

//   useEffect(() => {
//     // Function to load the Spotify SDK script
//     const loadSpotifySdk = () => {
//       const script = document.createElement('script');
//       script.src = 'https://sdk.scdn.co/spotify-player.js';
//       script.async = true;
//       script.onload = () => {
//         console.log('Spotify SDK script loaded');
//         if (window.Spotify) {
//           const player = new window.Spotify.Player({
//             name: "Spotify Web Player",
//             getOAuthToken: (cb: (token: string) => void) => {
//               if (token) cb(token);
//             },
//             volume: 0.5,
//           });

//           player.addListener("ready", ({ device_id }: { device_id: string }) => {
//             console.log('Spotify Player Ready');
//           });

//           player.addListener("player_state_changed", (state: PlaybackState) => {
//             if (state) {
//               setCurrentTrack(state.track_window.current_track);
//               setIsPaused(state.paused);
//             }
//           });

//           player.connect();
//           setPlayer(player);
//         }
//       };
//       script.onerror = () => {
//         console.error('Failed to load Spotify SDK script');
//       };
//       document.head.appendChild(script);
//     };

//     loadSpotifySdk();

//     // Cleanup script on component unmount
//     return () => {
//       const existingScript = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
//       if (existingScript) {
//         document.head.removeChild(existingScript);
//       }
//     };
//   }, [token]);

//   useEffect(() => {
//     if (token) {
//       fetch('https://api.spotify.com/v1/me/playlists', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//         .then(response => response.json())
//         .then(data => setPlaylists(data.items))
//         .catch(error => console.error('Error fetching playlists:', error));
//     }
//   }, [token]);

//   const handleLogin = () => {
//     const client_id = "3480f05891fc44d5ad2b161451a47979";
//     const redirect_uri = "http://localhost:3000/spotify-test";
//     const scopes = [
//       "streaming",
//       "user-read-email",
//       "user-read-private",
//       "user-library-read",
//       "user-read-playback-state",
//       "user-modify-playback-state"
//     ];

//     window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(
//       " "
//     )}&response_type=token&show_dialog=true`;
//   };

//   const handlePlayPause = () => {
//     if (player) {
//       if (isPaused) {
//         player.togglePlay().catch((error: any) => console.error('Error toggling playback:', error));
//       } else {
//         player.togglePlay().catch((error: any) => console.error('Error toggling playback:', error));
//       }
//     }
//   };

//   const handlePlaylistClick = (playlistId: string) => {
//     console.log('Playlist clicked:', playlistId);
//     // You can implement further actions like redirecting to a playlist page or opening a playlist modal
//   };

//   return (
//     <div className="spotify-test-container" style={{ padding: '20px' }}>
//       {!token ? (
//         <button onClick={handleLogin} style={{ padding: '10px', fontSize: '16px' }}>Login with Spotify</button>
//       ) : (
//         <div className="spotify-player">
//           <div className="mini-player" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//             {currentTrack && (
//               <>
//                 <img
//                   src={currentTrack.album.images[0].url}
//                   alt={currentTrack.name}
//                   className="mini-player-image"
//                   style={{ width: '50px', height: '50px', marginRight: '10px' }}
//                 />
//                 <div className="mini-player-info">
//                   <span className="mini-player-title" style={{ display: 'block', fontWeight: 'bold' }}>{currentTrack.name}</span>
//                   <span className="mini-player-artist" style={{ display: 'block', fontSize: '14px' }}>
//                     {currentTrack.artists.map((artist) => artist.name).join(", ")}
//                   </span>
//                 </div>
//               </>
//             )}
//             <button onClick={handlePlayPause} style={{ marginLeft: '20px', padding: '10px' }}>
//               {isPaused ? "Play" : "Pause"}
//             </button>
//           </div>
//           <div className="spotify-playlists">
//             {playlists.map((playlist) => (
//               <div key={playlist.id} className="playlist-item" onClick={() => handlePlaylistClick(playlist.id)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}>
//                 {playlist.name}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SpotifyTest;


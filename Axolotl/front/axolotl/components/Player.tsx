import React, { useState, useEffect } from 'react';
import styles from '../styles/player.module.scss';

// Define Track interface
interface Track {
  id: string;
  name: string;
  uri: string;
}

interface Playlist {
  id: string;
  name: string;
}

const Player: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  useEffect(() => {
    const loadSpotifySDK = () => {
      const existingScript = document.getElementById('spotify-sdk');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'spotify-sdk';
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.onload = () => {
          initializePlayer();
        };
        document.body.appendChild(script);
      } else {
        initializePlayer();
      }
    };

    const initializePlayer = () => {
      const token = window.localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      if (window.Spotify) {
        const newPlayer = new window.Spotify.Player({
          name: 'Your Spotify Player',
          getOAuthToken: (cb: (token: string) => void) => cb(token),
        });

        newPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
          console.log('Player is ready with device ID:', device_id);
          setPlayer(newPlayer);
        });

        newPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
          console.log('Player is not ready with device ID:', device_id);
        });

        newPlayer.connect().then((success: boolean) => {
          if (success) {
            console.log('The Web Playback SDK successfully connected to Spotify!');
          } else {
            console.error('Failed to connect to Spotify');
          }
        }).catch((error: unknown) => {
          if (error instanceof Error) {
            console.error('Error connecting to Spotify:', error.message);
          } else {
            console.error('Unexpected error:', error);
          }
        });
      } else {
        console.error('Spotify SDK is not loaded');
      }
    };

    loadSpotifySDK();
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    if (selectedPlaylist) {
      fetchPlaylistTracks(selectedPlaylist)
        .then(fetchedTracks => {
          if (Array.isArray(fetchedTracks)) {
            setTracks(fetchedTracks.map((item: any) => item.track));
          } else {
            console.error('Fetched tracks are not in expected format:', fetchedTracks);
          }
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            console.error('Error fetching playlist tracks:', error.message);
          } else {
            console.error('Unexpected error:', error);
          }
        });
    }
  }, [selectedPlaylist]);

  const fetchPlaylists = async () => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch playlists: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();
      setPlaylists(data.items || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching playlists:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const fetchPlaylistTracks = async (playlistId: string) => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return [];
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch playlist tracks: ${response.status} ${response.statusText}`);
        return [];
      }

      const data = await response.json();
      return data.items || [];
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching playlist tracks:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      return [];
    }
  };

  const handlePlaylistSelect = (playlistId: string) => {
    setSelectedPlaylist(playlistId);
  };

  const handlePlayTrack = async (trackUri: string) => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    if (player) {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/player/play', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: [trackUri],
          }),
        });

        if (!response.ok) {
          console.error(`Failed to play track: ${response.status} ${response.statusText}`);
          return;
        }

        const data = await response.json();
        console.log('Track is playing', data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error playing track:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    } else {
      console.error('Player instance is not available');
    }
  };

  return (
    <div className={styles.playerContainer}>
      <div className={styles.playlists}>
        <h3>Playlists</h3>
        {playlists.map(playlist => (
          <div
            key={playlist.id}
            onClick={() => handlePlaylistSelect(playlist.id)}
            className={styles.playlistItem}
          >
            {playlist.name}
          </div>
        ))}
      </div>
      <div className={styles.tracks}>
        {tracks.length > 0 ? (
          tracks.map(track => (
            <div key={track.id} className={styles.trackItem}>
              <span>{track.name}</span>
              <button onClick={() => handlePlayTrack(track.uri)}>Play</button>
            </div>
          ))
        ) : (
          <p>Select a playlist to see tracks</p>
        )}
      </div>
    </div>
  );
};

export default Player;





//page needs to be rendered in home


import React, { useState, useEffect } from 'react';
import Player from '../components/Player';
import axios from 'axios';

const Spoty: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPlaylists(response.data.items);
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div>
      <Player />
      <div className="playlists">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-item">
            {playlist.name}
          </div>
        ))}
      </div>
      <style jsx>{`
        .playlists {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }
        .playlist-item {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default Spoty;

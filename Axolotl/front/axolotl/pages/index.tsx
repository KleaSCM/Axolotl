
import React from 'react';
import AppLauncher from '../compoents/AppLauncher';
import Chat from '../compoents/Chat';
import FileExplorer from '../compoents/FileExplorer';
import Notepad from '../compoents/Notepad';
import SpotifyControl from '../compoents/SpotifyControl';

const Home: React.FC = () => {
  return (
    <div>
      <AppLauncher />
      <Chat />
      <FileExplorer />
      <Notepad />
      <SpotifyControl />
    </div>
  );
};

export default Home;

import React from 'react';
import AppLauncher from '../components/AppLauncher';
import Notepad from '../components/Notepad';

import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles['home-container']}>
      <div className={styles['main-content']}>
        <div className={styles['app-launcher']}>
          <AppLauncher />
        </div>
        <div className={styles['notepad']}>
          <Notepad />
        </div>
      </div>
      <div className={styles['spotify']}>
        {/* Spotify component */}
      </div>
    </div>
  );
};

export default Home;


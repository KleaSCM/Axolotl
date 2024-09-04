import React from 'react';
import AppLauncher from '../compoents/AppLauncher';
import Notepad from '../compoents/Notepad';
import styles from '../styles/AppLauncher.module.scss'; 

const Home: React.FC = () => {
  return (
    <div className={styles['app-launcher']}>
      <div style={{ flex: '1' }}>
        <AppLauncher />
      </div>
      <div style={{ width: '300px', borderLeft: '1px solid #ccc' }}>
        <Notepad />
      </div>
    </div>
  );
};

export default Home;

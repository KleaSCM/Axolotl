
import React, { useEffect, useState } from 'react';
import styles from '../styles/AppLauncher.module.scss';

type App = {
  name: string;
  path: string;
  icon: string;
};

type Apps = {
  [category: string]: App[];
};

const fetchAppPaths = async () => {
  try {
    const response = await fetch('/utils/paths/AppPaths.json');
    if (!response.ok) {
      throw new Error('Failed to fetch app paths');
    }
    const data: App[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching app paths:', error);
    return [];
  }
};

const determineCategory = (appName: string) => {
  if (
    appName.includes('Awakened PoE Trade') ||
    appName.includes('Diablo 4') ||
    appName.includes('World of Warcraft') ||
    appName.includes('Battle.net') ||
    appName.includes('Steam')
  ) {
    return 'Games';
  }
  if (
    appName.includes('Code') ||
    appName.includes('Visual Studio') ||
    appName.includes('python')
  ) {
    return 'Development';
  }
  if (appName.includes('Vivaldi')) {
    return 'Web';
  }
  if (
    appName.includes('Word') ||
    appName.includes('Excel') ||
    appName.includes('PowerPoint') ||
    appName.includes('Teams')
  ) {
    return 'Office';
  }
  if (appName.includes('PowerShell') || appName.includes('NVIDIA')) {
    return 'Tools';
  }
  return 'Other'; // Default category, although not used in this setup
};

const AppLauncher: React.FC = () => {
  const [appPaths, setAppPaths] = useState<App[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Games');

  useEffect(() => {
    const loadPaths = async () => {
      const paths = await fetchAppPaths();
      setAppPaths(paths);
    };

    loadPaths();
  }, []);

  const handleLaunch = async (path: string) => {
    try {
      const response = await fetch('/api/launchApp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appPath: path }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to launch application');
      }
      console.log(data.message); // Debugging line, can be removed later
    } catch (error) {
      console.error('Error launching application:', error);
    }
  };

  // Group apps by category
  const apps: Apps = appPaths ? appPaths.reduce((acc: Apps, app) => {
    const category = determineCategory(app.name);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(app);
    return acc;
  }, {}) : {};

  return (
    <div className={styles['app-launcher']}>
      <div className={styles['sidebar']}>
        <ul>
          {Object.keys(apps).map((category) => (
            <li key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles['app-grid']}>
        {apps[selectedCategory]?.map((app) => (
          <div key={app.name} className={styles['app-card']}>
            <img src={app.icon} alt={app.name} className={styles['app-icon']} />
            <div>{app.name}</div>
            <button className={styles['launch-button']} onClick={() => handleLaunch(app.path)}>
              Launch
            </button>
          </div>
        )) || <div>No apps available in this category.</div>}
      </div>
    </div>
  );
};

export default AppLauncher;

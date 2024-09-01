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
  const response = await fetch('/utils/paths/AppPaths.json');
  const data = await response.json();
  return data;
};

const determineCategory = (appName: string) => {
  // Example logic to determine the category based on app name
  if (appName.includes('Steam') || appName.includes('Battle.net') || appName.includes('World of Warcraft')) {
    return 'Games';
  }
  if (appName.includes('Code') || appName.includes('Visual Studio') || appName.includes('Python')) {
    return 'Development';
  }
  if (appName.includes('Spotify') || appName.includes('Music')) {
    return 'Music';
  }
  if (appName.includes('Vivaldi')) {
    return 'Media';
  }
  if (appName.includes('Word') || appName.includes('Excel') || appName.includes('PowerPoint') || appName.includes('Teams')) {
    return 'Office';
  }
  if (appName.includes('PowerShell') || appName.includes('GeForce') || appName.includes('Share')) {
    return 'Tools';
  }
  return 'Other'; // Default category
};

const AppLauncher: React.FC = () => {
  const [appPaths, setAppPaths] = useState<App[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Games');

  useEffect(() => {
    const loadPaths = async () => {
      try {
        const paths = await fetchAppPaths();
        setAppPaths(paths);
      } catch (error) {
        console.error('Error fetching app paths:', error);
      }
    };

    loadPaths();
  }, []);

  const handleLaunch = async (path: string) => {
    try {
      const response = await fetch('/api/launch', {
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









// import React, { useEffect, useState } from 'react';
// import styles from '../styles/AppLauncher.module.scss';

// type App = {
//   name: string;
//   path: string;
//   icon: string;
// };

// type Apps = {
//   [category: string]: App[];
// };

// const fetchAppPaths = async () => {
//   const response = await fetch('/utils/paths/AppPaths.json');
//   const data = await response.json();
//   return data;
// };

// const AppLauncher: React.FC = () => {
//   const [appPaths, setAppPaths] = useState<any | null>(null); structure
//   const [selectedCategory, setSelectedCategory] = useState<string>('Games');

//   useEffect(() => {
//     const loadPaths = async () => {
//       try {
//         const paths = await fetchAppPaths();
//         setAppPaths(paths);
//       } catch (error) {
//         console.error('Error fetching app paths:', error);
//       }
//     };

//     loadPaths();
//   }, []);

//   const apps: Apps = appPaths ? {
//     Games: [
//       { name: 'Battle.net', path: appPaths.battleNet, icon: '/battlenet.jpg' },
//       { name: 'Steam', path: appPaths.steam, icon: '/Steam.jpg' },
//       { name: 'Awakened PoE Trade', path: appPaths.awakenedPoETrade, icon: '/poeTrade.jpg' },
//     ],
//     Development: [
//       { name: 'Visual Studio', path: appPaths.visualStudio, icon: '/vs.jpg' },
//       { name: 'VSCode', path: appPaths.vsCode, icon: '/code.jpg' },
//       { name: 'PostgreSQL', path: appPaths.postgreSQL, icon: '/postgresql.png' },
//     ],
//     Music: [
//       { name: 'Spotify', path: appPaths.spotify, icon: '/Spotify.png' },
//     ],
//     Media: [
//       { name: 'Vivaldi', path: appPaths.vivaldi, icon: '/vivaldi.png' },
//     ],
//     Office: [
//       { name: 'MS Word', path: appPaths.msWord, icon: '/ms-word.svg' },
//       { name: 'MS Excel', path: appPaths.msExcel, icon: '/Excel.png' },
//       { name: 'MS PowerPoint', path: appPaths.msPowerPoint, icon: '/Powerpoint.jpg' },
//       { name: 'MS Teams', path: appPaths.msTeams, icon: '/teams.jpg' },
//     ],
//     Tools: [
//       { name: 'Windows PowerShell (x86)', path: appPaths.powershellX86, icon: '/ps.jpg' },
//       { name: 'NVIDIA GeForce', path: appPaths.nvidiaGeForce, icon: '/nvidiagforceexp.jpg' },
//       { name: 'NVIDIA Share', path: appPaths.nvidiaShare, icon: '/share.jpg' },
//     ],
//   } : {};

//   return (
//     <div className={styles['app-launcher']}>
//       <div className={styles['sidebar']}>
//         <ul>
//           {Object.keys(apps).map((category) => (
//             <li key={category} onClick={() => setSelectedCategory(category)}>
//               {category}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className={styles['app-grid']}>
//         {apps[selectedCategory]?.map((app) => (
//           <div key={app.name} className={styles['app-card']}>
//             <img src={app.icon} alt={app.name} className={styles['app-icon']} />
//             <div>{app.name}</div>
//             <button className={styles['launch-button']} onClick={() => window.open(app.path)}>
//               Launch
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AppLauncher;























// import React, { useState } from 'react';
// import { appPaths } from '../utils/appPaths';

// interface App {
//   name: string;
//   path: string;
// }

// interface Categories {
//   [key: string]: App[];
// }

// const AppLauncher: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>('Games');

//   const categories: Categories = {
//     Games: [
//       { name: 'Battle.net', path: appPaths.battleNet },
//       { name: 'Steam', path: appPaths.steam },
//       { name: 'Awakened PoE Trade', path: appPaths.awakenedPoETrade },
//     ],
//     Development: [
//       { name: 'Visual Studio', path: appPaths.visualStudio },
//       { name: 'VSCode', path: appPaths.vsCode },
//       { name: 'PostgreSQL', path: appPaths.postgreSQL },
//     ],
//     Music: [
//       { name: 'Spotify', path: appPaths.spotify },
//     ],
//     Media: [
//       { name: 'Vivaldi', path: appPaths.vivaldi },
//     ],
//     Office: [
//       { name: 'MS Word', path: appPaths.msWord },
//       { name: 'MS Excel', path: appPaths.msExcel },
//       { name: 'MS PowerPoint', path: appPaths.msPowerPoint },
//       { name: 'MS Teams', path: appPaths.msTeams },
//     ],
//     Tools: [
//       { name: 'Windows PowerShell (x86)', path: appPaths.powershellX86 },
//       { name: 'NVIDIA GeForce', path: appPaths.nvidiaGeForce },
//       { name: 'NVIDIA Share', path: appPaths.nvidiaShare },
//     ],
//   };

//   const handleLaunch = async (path: string) => {
//     try {
//       const response = await fetch('/api/launchApp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ appPath: path }),
//       });

//       const result = await response.json();
//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to launch application');
//       }
//       alert(result.message);
//     } catch (error) {
//       if (error instanceof Error) {
//         alert(`Error: ${error.message}`);
//       } else {
//         alert('Unknown error occurred');
//       }
//     }
//   };

//   return (
//     <div className="app-launcher">
//       <div className="category-list">
//         {Object.keys(categories).map((category) => (
//           <button key={category} onClick={() => setSelectedCategory(category)}>
//             {category}
//           </button>
//         ))}
//       </div>
//       <div className="app-grid">
//         {categories[selectedCategory].map((app: App) => (
//           <div key={app.name} className="app-card">
//             <span>{app.name}</span>
//             <button className="launch-button" onClick={() => handleLaunch(app.path)}>Launch</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AppLauncher;




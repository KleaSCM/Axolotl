
import React, { useState } from 'react';
import { appPaths } from '../utils/appPaths';
import styles from '../styles/AppLauncher.module.scss'; 

// Define the Apps type if not already defined
type App = {
  name: string;
  path: string;
  icon: string;
};

type Apps = {
  [key: string]: App[];
};

const AppLauncher: React.FC = () => {
  // Define categories and apps
  const [categories] = useState<string[]>([
    'Games',
    'Development',
    'Music',
    'Media',
    'Office',
    'Work',
    'Web',
    'Tools'
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('Games');


  // place all the apps here
  const apps: Apps = {
    Games: [
      { name: 'Battle.net', path: appPaths.battleNet, icon: 'path-to-battlenet-icon' },
      { name: 'Steam', path: appPaths.steam, icon: 'path-to-steam-icon' },
      { name: 'Awakened PoE Trade', path: appPaths.awakenedPoETrade, icon: 'path-to-awakenedpoetrade-icon' },
      // Add more games here
    ],
    Development: [
      { name: 'Visual Studio', path: appPaths.visualStudio, icon: 'path-to-visualstudio-icon' },
      { name: 'VSCode', path: appPaths.vsCode, icon: 'path-to-vscode-icon' },
      { name: 'PostgreSQL', path: appPaths.postgreSQL, icon: 'path-to-postgresql-icon' },
      // Add more development tools here
    ],
    Music: [],
    Media: [],
    Office: [],
    Work: [],
    Web: [],
    Tools: [
      { name: 'Windows PowerShell (x86)', path: appPaths.powershellX86, icon: 'path-to-powershell-icon' },
      // Add more tools here
    ],
  };
  // end of app block

  // Handler for launching apps
  const handleLaunch = async (path: string) => {
    try {
      const response = await fetch('/api/launchApp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appPath: path })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to launch application');
      }
      alert(result.message);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Unknown error occurred');
      }
    }
  };

  return (
    <div className={styles.appLauncher}>
      <div className={styles.sidebar}>
        <h2>Categories</h2>
        <ul className={styles.categoryList}>
          {categories.map((category) => (
            <li
              key={category}
              className={category === selectedCategory ? styles.activeCategory : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.appGrid}>
        {apps[selectedCategory].map((app) => (
          <div key={app.name} className={styles.appCard}>
            <img src={app.icon} alt={app.name} className={styles.appIcon} />
            <h3 className={styles.appName}>{app.name}</h3>
            <button className={styles.launchButton} onClick={() => handleLaunch(app.path)}>Launch</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppLauncher;







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




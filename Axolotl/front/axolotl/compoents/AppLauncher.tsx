import React, { useState } from 'react';
import { appPaths } from '../utils/appPaths';
import styles from '../styles/AppLauncher.module.scss';

type App = {
  name: string;
  path: string;
  icon: string;
};

type Apps = {
  [category: string]: App[];
};

const apps: Apps = {
  Games: [
    { name: 'Battle.net', path: appPaths.battleNet, icon: '/battlenet.jpg' },
    { name: 'Steam', path: appPaths.steam, icon: '/Steam.jpg' },
    { name: 'Awakened PoE Trade', path: appPaths.awakenedPoETrade, icon: '/poeTrade.jpg' },
  ],
  Development: [
    { name: 'Visual Studio', path: appPaths.visualStudio, icon: '/vs.jpg' },
    { name: 'VSCode', path: appPaths.vsCode, icon: '/code.jpg' },
    { name: 'PostgreSQL', path: appPaths.postgreSQL, icon: '/postgresql.png' },
  ],
  Music: [
    { name: 'Spotify', path: appPaths.spotify, icon: '/Spotify.png' },
  ],
  Media: [
    { name: 'Vivaldi', path: appPaths.vivaldi, icon: '/vivaldi.png' },
  ],
  Office: [
    { name: 'MS Word', path: appPaths.msWord, icon: '/ms-word.svg' },
    { name: 'MS Excel', path: appPaths.msExcel, icon: '/Excel.png' },
    { name: 'MS PowerPoint', path: appPaths.msPowerPoint, icon: '/Powerpoint.jpg' },
    { name: 'MS Teams', path: appPaths.msTeams, icon: '/teams.jpg' },
  ],
  Tools: [
    { name: 'Windows PowerShell (x86)', path: appPaths.powershellX86, icon: '/ps.jpg' },
    { name: 'NVIDIA GeForce', path: appPaths.nvidiaGeForce, icon: '/nvidiagforceexp.jpg' },
    { name: 'NVIDIA Share', path: appPaths.nvidiaShare, icon: '/share.jpg' },
  ],
};


const AppLauncher: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Games');

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
        {apps[selectedCategory].map((app) => (
          <div key={app.name} className={styles['app-card']}>
            <img src={app.icon} alt={app.name} className={styles['app-icon']} />
            <div>{app.name}</div>
            <button className={styles['launch-button']} onClick={() => window.open(app.path)}>
              Launch
            </button>
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




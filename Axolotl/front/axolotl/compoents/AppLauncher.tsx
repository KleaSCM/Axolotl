
import React, { useState } from 'react';
import { appPaths } from '../utils/appPaths';

const AppLauncher: React.FC = () => {
  const [applications] = useState([
    { name: 'Battle.net', path: appPaths.battleNet },
    { name: 'Steam', path: appPaths.steam },
    { name: 'Razer Synapse', path: appPaths.razerSynapse }
  ]);

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
    <div className="app-launcher">
      <h1>App Launcher</h1>
      <ul className="app-list">
        {applications.map((app) => (
          <li key={app.name} className="app-item">
            <span>{app.name}</span>
            <button onClick={() => handleLaunch(app.path)}>Launch</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppLauncher;

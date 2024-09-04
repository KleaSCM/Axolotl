import React, { useState } from 'react';
import styles from '../styles/Notepad.module.scss'; 

const Notepad: React.FC = () => {
  const [text, setText] = useState('');

  return (
    <div className={styles['notepad-container']}>
      <h1>Notepad</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles['textarea']}
        rows={10}
      />
      {/* text editor features */}
    </div>
  );
};

export default Notepad;

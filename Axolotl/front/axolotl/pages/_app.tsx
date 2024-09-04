

import { AppProps } from 'next/app';
import { useEffect } from 'react';
import Script from 'next/script'; 

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
   
    const loadSpotifyScript = () => {
      if (!window.Spotify) {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    loadSpotifyScript();
  }, []);

  return (
    <>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="beforeInteractive" // Load the script before the page is interactive
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

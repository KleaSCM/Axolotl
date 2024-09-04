import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Ensure onSpotifyWebPlaybackSDKReady is defined globally
    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify SDK script loaded and onSpotifyWebPlaybackSDKReady function defined');
    };
  }, []);

  return (
    <>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="afterInteractive"
        onLoad={() => console.log('Spotify SDK script loaded')}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

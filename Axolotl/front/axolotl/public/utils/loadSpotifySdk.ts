

export const loadSpotifySdk = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined') {
      // Check if the Spotify SDK script is already loaded
      if (window.Spotify) {
        resolve(); // SDK is already loaded
        return;
      }

      // Define the callback function for SDK readiness
      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        resolve(); // SDK is ready
      };

      // Create and load the Spotify SDK script
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      // Handle successful script load
      script.onload = () => {
        console.log('Spotify SDK script loaded successfully.');
      };

      // Handle script load error
      script.onerror = (event: Event) => {
        reject(new Error('Failed to load the Spotify SDK script.'));
      };

      document.body.appendChild(script);
    } else {
      reject(new Error('Window object is not available.'));
    }
  });
};


interface Window {
  Spotify: any; // for Spotify Web Playback SDK
  onSpotifyWebPlaybackSDKReady: () => void; // Callback when SDK is ready
}

declare module 'spotify-web-playback-sdk' {
  export interface Player {
    play(options?: { uris: string[] }): Promise<void>;
    pause(): Promise<void>;

  }

  export const Player: {
    new (options: {
      name: string;
      getOAuthToken: (cb: (token: string) => void) => void;
    }): Player;
    onSpotifyWebPlaybackSDKReady: () => void;
  };
}


declare namespace Spotify {
  interface PlayerOptions {
    name: string;
    getOAuthToken: (callback: (token: string) => void) => void;
  }

  interface Player {
    addListener(event: string, callback: (...args: any[]) => void): void;
    connect(): Promise<boolean>;
  }

  interface ReadyEvent {
    device_id: string;
  }

  interface PlayerState {

    position: number;
    duration: number;

  }
}

declare const Spotify: {
  Player: new (options: Spotify.PlayerOptions) => Spotify.Player;
  onSpotifyWebPlaybackSDKReady: () => void;
};

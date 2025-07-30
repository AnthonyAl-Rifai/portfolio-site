
export type AudioAssets = {
  wav: string;
  mp3: {
    forward: string;
    reversed: string;
    silent: string;
  };
}

export type AudioTrack = {
  id: string;
  assets: AudioAssets;
  title: string;
  album: string;
  artist: string;
  artwork?: MediaMetadataInit['artwork'];
}

export type Playlist = AudioTrack[];

export type PlaylistSong = {
  id: string;
  addedAt: Date;
  song: {
    id: string;
    iTunesId: number;
    name: string;
    portrait: string;
    previewUrl: string;
    durationInSeconds: number;
    artist: {
      id: string;
      iTunesId: number;
      name: string;
    };
    album: {
      id: string;
      iTunesId: number;
      name: string;
    }
  }
}
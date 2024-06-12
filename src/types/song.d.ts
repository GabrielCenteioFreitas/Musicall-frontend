export type ITunesSong = {
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl: string;
  artworkUrl100: string;
  releaseDate: Date;
  trackTimeMillis: number;
  primaryGenreName: string;
}

export type DBSong = {
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
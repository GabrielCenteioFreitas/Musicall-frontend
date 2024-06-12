import { DBSong } from "./song";

export type ITunesAlbum = {
  collectionId: number;
  collectionName: string;
  collectionViewUrl: string;
  artworkUrl100: string;
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  trackCount: number;
  releaseDate: Date;
  primaryGenreName: string;
}

export type DBAlbum = {
  name: string;
  portrait: string;
  iTunesId: number;
  iTunesViewUrl: string;
  releaseDate: Date;
  genre: string;
  artist: {
    id: string;
    iTunesId: number;
    name: string;
  };
  songs: DBSong[];
}
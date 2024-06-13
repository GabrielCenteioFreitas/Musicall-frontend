import { DBArtist } from "./artist";
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
  id: string;
  name: string;
  portrait: string;
  iTunesId: number;
  iTunesViewUrl: string;
  releaseDate: Date;
  genre: string;
  artist: DBArtist;
  songs: DBSong[];
}
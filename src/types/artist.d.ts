import { DBAlbum } from "./album";
import { DBSong } from "./song";

export type ITunesArtist = {
  artistId: number;
  amgArtistId: number;
  artistName: string;
  artistLinkUrl: string;
  primaryGenreName: string;
}

export type DBArtist = {
  id: string;
  name: string;
  iTunesId: number;
  iTunesViewUrl: string;
  genre: String;
  albums: DBAlbum[];
  songs: DBSong[];
}
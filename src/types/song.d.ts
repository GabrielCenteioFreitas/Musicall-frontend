import { DBAlbum } from "./album";
import { DBArtist } from "./artist";

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
  artist: DBArtist;
  album: DBAlbum;
}

export type PlaylistSong = {
  id: string;
  addedAt: Date;
  song: DBSong;
}

export type PlayingSong = {
  id?: string;
  song: {
    id?: DBSong['id'];
    name: DBSong['name'];
    iTunesId: DBSong['iTunesId'];
    portrait: DBSong['portrait'];
    previewUrl: DBSong['previewUrl'];
    artist: Pick<DBArtist, 'iTunesId' | 'name'>;
    album: Pick<DBAlbum, 'iTunesId'>;
  };
}
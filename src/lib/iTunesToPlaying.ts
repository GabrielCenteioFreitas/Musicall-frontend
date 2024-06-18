import { ITunesSong, PlayingSong } from "@/types/song";

// this function transforms a song of iTunesSong type to PlayingSong type
export type ITunesNecessaryType = Pick<ITunesSong, 
  "trackName" |
  "artworkUrl100" |
  "previewUrl" |
  "trackId" |
  "collectionId" |
  "artistName" |
  "artistId"
>
export const iTunesToPlaying = (song: ITunesNecessaryType): PlayingSong => {
  return {
    song: {
      name: song.trackName,
      portrait: song.artworkUrl100,
      previewUrl: song.previewUrl,
      iTunesId: song.trackId,
      album: {
        iTunesId: song.collectionId,
      },
      artist: {
        name: song.artistName,
        iTunesId: song.artistId,
      },
    }
  }
}
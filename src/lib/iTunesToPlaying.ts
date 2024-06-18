import { ITunesSong, PlayingSong } from "@/types/song";

// this function transforms a song of iTunesSong type to PlayingSong type
export const iTunesToPlaying = (song: ITunesSong): PlayingSong => {
  return {
    song: {
      name: song.trackName,
      portrait: song.artworkUrl100,
      previewUrl: song.previewUrl,
      iTunesId: song.trackId,
      album: {
        name: song.collectionName,
        iTunesId: song.collectionId,
      },
      artist: {
        name: song.artistName,
        iTunesId: song.artistId,
      },
    }
  }
}
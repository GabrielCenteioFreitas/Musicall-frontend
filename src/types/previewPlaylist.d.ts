export type PreviewPlaylist = {
  id: string;
  name: string;
  portrait: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  songs: {
    song: {
      portrait: string;
      iTunesId: number;
    }
  }[]
}
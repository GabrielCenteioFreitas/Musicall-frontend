export type PreviewPlaylist = {
  id: string;
  name: string;
  portrait: string;
  isFixed: boolean;
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
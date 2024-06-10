import { LoadingIcon } from "@/components/LoadingIcon";
import { getPlaylist } from "@/lib/getPlaylistsData";
import { useQuery } from "@tanstack/react-query";
import JSCookies from "js-cookie";
import Cookies from "cookies";
import { useParams, useRouter } from "next/navigation";
import { GetServerSideProps } from "next";
import { Playlist } from "@/types/playlist";
import { loginURL } from "@/components/DefaultLayout/Header/SignIn";

interface PlaylistPageParams {
  token: string;
  id: string;
  initialPlaylistData: Playlist;
}

const PlaylistPage = ({
  token,
  id,
  initialPlaylistData
}: PlaylistPageParams) => {
  // const token = JSCookies.get('token');
  // const params = useParams<{ id: string }>();
  // const { id } = params;
  // const router = useRouter();

  const { data: playlist, isLoading } = useQuery({
    queryKey: ['playlist', id],
    queryFn: async () => {
      const response = await getPlaylist(id, token || null);
      // if (!response) {
      //   router.push('/');
      //   return
      // }
      return response
    },
    initialData: initialPlaylistData,
  });

  if (isLoading) {
    return (
      <div className="size-full grid place-content-center">
        <LoadingIcon size={48} />
      </div>
    )
  }

  return (
    <h1>{playlist?.name}</h1>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');
  const id = params?.id as string
  const playlist = await getPlaylist(id, token || null)

  if (!playlist) {
    return {
      redirect: {
        destination: token ? "/" : "/search",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
      id,
      initialPlaylistData: playlist,
    }
  }
}

export default PlaylistPage;
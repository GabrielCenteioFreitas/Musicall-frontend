import { DBUser } from "@/types/user";
import Image from "next/image";
import dayjs from "dayjs";
import ptBr from 'dayjs/locale/pt-br';
import { EditUserInfo } from "./EditUserInfo";
import { MediaInput } from "./MediaInput";
import { toBase64, shimmer } from "@/lib/shimmer";
dayjs.locale(ptBr)

interface UserInfoProps {
  user: Pick<DBUser,
    'name' |
    'avatarUrl' |
    'createdAt'
  >
  predominantColor: string;
  id: string; 
  isUserTheCreator: boolean;
}

export const UserInfo = ({ user, predominantColor, id, isUserTheCreator }: UserInfoProps) => {
  return (
    <div className="flex items-center gap-4 w-full h-fit">
      <div className="size-56 rounded-xl shrink-0 relative group">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={100}
          height={100}
          className="w-full aspect-square rounded-xl object-cover object-top"
          style={{ backgroundColor: predominantColor }}
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(100, 100))}`}
        />

        {isUserTheCreator && (
          <MediaInput user={{ id }} />
        )}
      </div>

      <div className="flex flex-col gap-1 py-1 group">
        <div className="flex items-center gap-2">
          <h2 className="text-[2.5rem] font-bold truncate ..." title={user.name}>
            {user.name}
          </h2>
  
          {isUserTheCreator && (
            <EditUserInfo
              user={user}
              id={id}
              className="opacity-0 group-hover:opacity-100 duration-300"
              size={24}
            />
          )}
        </div>

        <p className="text-md text-zinc-400 leading-none">
          Conta criada em {dayjs(user.createdAt).format("D[ de ]MMMM[ de ]YYYY")}
        </p>
      </div>
    </div>
  );
}

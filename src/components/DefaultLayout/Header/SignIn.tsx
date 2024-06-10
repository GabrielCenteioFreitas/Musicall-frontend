import { IoPerson } from "react-icons/io5";

const redirectURI =
  process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api/auth/callback'
  : 'https://musicall-project.vercel.app/api/auth/callback'

export const loginURL = 
  'https://accounts.google.com/o/oauth2/v2/auth'
  + `?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`
  + `&redirect_uri=${redirectURI}`
  + '&scope=profile'
  + '&response_type=code'

export const SignIn = () => {
  return (
    <a
      href={loginURL}
      className="flex items-center gap-2"
    >
      <span className="max-w-32 text-sm text-right hover:text-gray-300">
        Clique aqui para<br/>
        <span className="underline">se conectar!</span>
      </span>

      <div className="size-10 flex items-center justify-center rounded-full bg-zinc-700">
        <IoPerson size={24} className="text-zinc-400" />
      </div>
    </a>
  );
}

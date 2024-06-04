import { IoPerson } from "react-icons/io5";

export const SignIn = () => {
  const redirectURI =
    process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/auth/callback'
    : 'https://musical-project.vercel.app/api/auth/callback'

  const loginURL = 
    'https://accounts.google.com/o/oauth2/v2/auth'
    + `?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`
    + `&redirect_uri=${redirectURI}`
    + '&scope=profile'
    + '&response_type=code'

  return (
    <a
      href={loginURL}
      className="flex items-center gap-2"
    >
      <span className="max-w-32 text-sm text-right hover:text-gray-300">
        Clique aqui para <span className="underline">criar sua conta!</span>
      </span>

      <div className="size-10 bg-zinc-900 rounded-full p-0.5 overflow-hidden cursor-pointer">
        <div className="size-full flex items-center justify-center rounded-full bg-zinc-700">
          <IoPerson size={24} className="text-zinc-400" />
        </div>
      </div>
    </a>
  );
}

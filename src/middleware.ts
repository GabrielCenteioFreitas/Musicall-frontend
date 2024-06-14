import { NextRequest, NextResponse } from "next/server";
import { loginURL } from "./components/DefaultLayout/Header/SignIn";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(loginURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`
      }
    })
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/library', '/favorites']
}
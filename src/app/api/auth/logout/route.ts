import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.url)
  const cookies = request.cookies

  const response = NextResponse.redirect(redirectURL);
  if (cookies.get('token')) {
    response.headers.set('Set-Cookie', 'token=; Path=/; max-age=0')
  }
  if (cookies.get('redirectTo')) {
    response.headers.set('Set-Cookie', 'redirectTo=; Path=/; max-age=0');
  }

  return response;
}
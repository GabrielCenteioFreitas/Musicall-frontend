import { url } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    const redirectURL = new URL('/', request.url)
    
    return NextResponse.redirect(redirectURL)
  }

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await fetch(
    url('/register'),
    {
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
  const data = await registerResponse.json()
  
  const { token } = data

  const redirectURL = redirectTo ?? new URL('/', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30 // 30 days

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`
    }
  })
}
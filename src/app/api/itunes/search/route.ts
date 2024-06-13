import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const term = request.nextUrl.searchParams.get('term');
  const entity = request.nextUrl.searchParams.get('entity');
  const limit = request.nextUrl.searchParams.get('limit');
  
  const params = new URLSearchParams({
    term: term || '',
    entity: entity || '',
    limit: limit || '',
  })

  const url = (`https://itunes.apple.com/search?${params}`)
  
  try {
      const response = await fetch(
        url,
        {
          method: 'GET',
        }
      );
      const data = await response.json();

      return NextResponse.json(data);
  } catch (error) {
      console.error('Erro ao buscar dados no iTunes:', error);

      return NextResponse.error()
  }
}
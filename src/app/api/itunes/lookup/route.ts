import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  const amgArtistId = request.nextUrl.searchParams.get('amgArtistId');
  const entity = request.nextUrl.searchParams.get('entity');
  const limit = request.nextUrl.searchParams.get('limit');
  
  const params = new URLSearchParams({
    id: id || '',
    amgArtistId: amgArtistId || '',
    entity: entity || '',
    limit: limit || '',
  })

  const url = (`https://itunes.apple.com/lookup?${params}`)
  
  try {
      const response = await fetch(
        url,
        {
          method: 'GET',
        }
      );
      
      if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch iTunes data' }, { status: response.status });
      }
      
      const data = await response.json();

      return NextResponse.json(data);
  } catch (error) {
      console.error('Error fetching iTunes lookup data:', error);

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
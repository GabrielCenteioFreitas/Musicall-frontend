import { cache } from "react";

const url = (path: string) => {
  const baseURL = 'https://itunes.apple.com'

  return path.startsWith('/')
    ? baseURL.concat(path)
    : baseURL.concat('/', path)
}

interface getDataFromSearchParams {
  term: string;
  entity: string;
  limit: number;
}
export const getDataFromSearch = cache(async ({ term, entity, limit }: getDataFromSearchParams) => {
  const params = new URLSearchParams({
    term,
    entity,
    limit: limit.toString()
  })
  
  const response = await fetch(
    url(`/search?${params}`),
    {
      method: 'GET',
    }
  )
  const data = await response.json()

  return data
})


interface getDataFromLookupParams {
  id?: number;
  amgArtistId?: number;
  amgCollectionId?: number;
  amgTrackId?: number;
  entity?: string;
  limit?: number;
}
export const getDataFromLookup = cache(async ({
  id,
  amgArtistId,
  amgCollectionId,
  amgTrackId,
  entity,
  limit 
}: getDataFromLookupParams): Promise<any> => {
  const params = new URLSearchParams({
    id: id ? id.toString() : '',
    amgArtistId: amgArtistId ? amgArtistId.toString() : '',
    amgCollectionId: amgCollectionId ? amgCollectionId.toString() : '',
    amgTrackId: amgTrackId ? amgTrackId.toString() : '',
    entity: entity ? entity : '',
    limit: limit ? limit.toString() : '',
  })
    
  const response = await fetch(
    url(`/lookup?${params}`),
    {
      method: 'GET',
    }
  )
  const data = await response.json()

  return data
})
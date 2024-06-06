import axios from "axios"

const api = axios.create({
  baseURL: 'https://itunes.apple.com'
})

export async function getData(term: string, entity: string, limit: number) {
  const response = await api.get(
    '/search',
    {
      params: {
        term: term,
        entity: entity,
        limit: limit
      }
    }
  )

  return response.data
}
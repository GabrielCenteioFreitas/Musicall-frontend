export const baseURL = 
  process.env.NODE_ENV === 'production'
  ? 'https://musicall-backend.vercel.app'
  : 'http://localhost:3333'

export const url = (path: string) => {
  return path.startsWith('/')
    ? baseURL.concat(path)
    : baseURL.concat('/', path)
}
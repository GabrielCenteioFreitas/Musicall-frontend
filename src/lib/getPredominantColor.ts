import Vibrant from 'node-vibrant';

export const getPredominantColor = async (url: string) => {
  const palette = await Vibrant.from(url).getPalette()
  const predominantColor = palette.Muted?.hex

  return predominantColor
}
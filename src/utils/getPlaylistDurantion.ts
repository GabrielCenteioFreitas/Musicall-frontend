export function getPlaylistDuration(duration: number) {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = duration - (hours*3600 + minutes*60)
  
  const playlistDuration = ''.concat(
    hours > 0
      ? `
        ${hours}h
        ${minutes > 0
          ? `${minutes}m`
          : `
            ${seconds > 0
              ? `${seconds}s`
              : ``}
            `
          }
        `
      : minutes > 0
          ? `
            ${minutes}m
            ${seconds > 0
              ? `${seconds}s`
              : ``}
            `
          : `${seconds}s`
  )

  return playlistDuration
}
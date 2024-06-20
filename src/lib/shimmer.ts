export const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#3a3a3a" offset="0%" />
        <stop stop-color="#3f3f3f" offset="10%" />
        <stop stop-color="#4a4a4a" offset="20%" />
        <stop stop-color="#3f3f3f" offset="30%" />
        <stop stop-color="#3a3a3a" offset="50%" />
        <stop stop-color="#3a3a3a" offset="100%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#3a3a3a" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
  </svg>`;


export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
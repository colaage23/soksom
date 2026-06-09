/* 혼잡도에 따른 마커 색 변경ㄴ을 위함임 */
export const getMarkerSrc = (color: string = "#0C9799") => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184.54 184.54">
  <circle cx="92.27" cy="92.27" r="92.27" fill="${color}"/>
  <path fill="#fff" d="m92.27,38.09c-24.63,0-44.6,19.96-44.6,44.6,0,38.82,44.6,63.77,44.6,63.77,0,0,44.6-24.96,44.6-63.77,0-24.63-19.97-44.6-44.6-44.6Zm0,59.06c-7.99,0-14.46-6.48-14.46-14.46s6.48-14.46,14.46-14.46,14.46,6.48,14.46,14.46-6.48,14.46-14.46,14.46Z"/>
</svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

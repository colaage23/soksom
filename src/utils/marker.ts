import landmarkSvg from "lucide-static/icons/landmark.svg?raw";
import partyPopperSvg from "lucide-static/icons/party-popper.svg?raw";
import bedDoubleSvg from "lucide-static/icons/bed-double.svg?raw";
import shoppingBagSvg from "lucide-static/icons/shopping-bag.svg?raw";
import utensilsCrossedSvg from "lucide-static/icons/utensils-crossed.svg?raw";
import { Camera, SportShoe } from "lucide-static";

const extractIconInner = (raw: string) =>
  raw.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

const CATEGORY_ICONS: Record<string, string> = {
  "12": extractIconInner(Camera), // 관광지
  "14": extractIconInner(landmarkSvg), // 문화시설
  "15": extractIconInner(partyPopperSvg), // 행사
  "28": extractIconInner(SportShoe), // 레포츠
  "32": extractIconInner(bedDoubleSvg), // 숙박
  "38": extractIconInner(shoppingBagSvg), // 쇼핑
  "39": extractIconInner(utensilsCrossedSvg), // 음식점
};

export const getMarkerSrc = (color: string, contenttypeid?: string) => {
  const iconInner = contenttypeid ? CATEGORY_ICONS[contenttypeid] : undefined;

  const iconGroup = iconInner
    ? `<g transform="translate(92.27,84) scale(2) translate(-12,-13)" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${iconInner}</g>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184.54 184.54">
  <path fill="${color}" d="m92.27,38.09c-24.63,0-44.6,19.96-44.6,44.6,0,38.82,44.6,63.77,44.6,63.77,0,0,44.6-24.96,44.6-63.77,0-24.63-19.97-44.6-44.6-44.6Zm0,59.06c-7.99,0-14.46-6.48-14.46-14.46s6.48-14.46,14.46-14.46,14.46,6.48,14.46,14.46-6.48,14.46-14.46,14.46Z"/>
  <circle cx="92.27" cy="84" r="36" fill="#fff"/>
  ${iconGroup}
</svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

export const getNumberMarkerSrc = (number: number) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.8 237" width="36" height="44">
      <path fill="#0C9799" d="m96.39,0c53.24,0,96.4,43.16,96.4,96.4,0,56.12-43.13,104.87-71.69,131-13.98,12.79-35.44,12.79-49.41,0C43.13,201.27,0,152.52,0,96.4S43.16,0,96.4,0h0Z"/>
      <path fill="#17c2c5" d="m96.39,8c48.8,0,88.4,39.6,88.4,88.4,0,51.5-39.6,96.2-65.8,120.2-12.8,11.7-32.5,11.7-45.2,0C47.6,192.6,8,148,8,96.4S47.6,8,96.4,8h0Z"/>
      <text x="96" y="107" text-anchor="middle" dominant-baseline="middle" font-size="100" font-weight="700" fill="#fff" font-family="Pretendard">${number}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

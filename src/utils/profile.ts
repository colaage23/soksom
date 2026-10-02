import { DEFAULT_PROFILE_IMAGES } from "../constants/profile";

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

export const getDefaultProfileImage = (seed?: string | null) => {
  if (!seed) return DEFAULT_PROFILE_IMAGES[0];

  const index = hashString(seed) % DEFAULT_PROFILE_IMAGES.length;
  return DEFAULT_PROFILE_IMAGES[index];
};

export const getProfileImage = (
  img: string | null | undefined,
  seed?: string | null,
) => img || getDefaultProfileImage(seed);

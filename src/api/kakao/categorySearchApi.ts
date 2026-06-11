import axios from "axios";

export interface IKakaoCategorySearch {
  x: number;
  y: number;
}

const KAKAO_REST_API = import.meta.env.VITE_APP_KAKAO_REST_API_KEY;

export const getKakaoCategorySearch = async ({
  x,
  y,
}: IKakaoCategorySearch) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=PK6&page=1&size=15&sort=accuracy&radius=1000&y=${y}&x=${x}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Fetch Kakao CategorySearch Error: ", error);
    throw new Error("Fail to fetch Kakao CategorySearch.", { cause: error });
  }
};

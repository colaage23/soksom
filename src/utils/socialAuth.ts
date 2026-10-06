type Provider = "kakao" | "google" | "naver";

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const getSocialAuthUrl = (provider: Provider) => {
  const state = provider; // 콜백에서 provider 구분용

  switch (provider) {
    case "kakao":
      return `https://kauth.kakao.com/oauth/authorize?client_id=${
        import.meta.env.VITE_KAKAO_CLIENT_ID
      }&redirect_uri=${REDIRECT_URI}&response_type=code&state=${state}`;

    case "google":
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
        import.meta.env.VITE_GOOGLE_CLIENT_ID
      }&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid email profile&state=${state}`;

    case "naver":
      return `https://nid.naver.com/oauth2.0/authorize?client_id=${
        import.meta.env.VITE_NAVER_CLIENT_ID
      }&redirect_uri=${REDIRECT_URI}&response_type=code&state=${state}`;
  }
};

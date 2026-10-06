export interface IJejuWeatherForecastItem {
  day: string;
  temperature: string;
  rainProbability: string;
  weatherCode: number;
}

export interface IJejuWeather {
  locationLabel: string;
  summary: string;
  temperature: string;
  apparentTemperature: string;
  humidity: string;
  windSpeed: string;
  uvIndex: string;
  weatherCode: number;
  isDay: boolean;
  forecast: IJejuWeatherForecastItem[];
}

interface IOpenMeteoResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    precipitation_probability_max: number[];
    uv_index_max: number[];
  };
}

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";
const JEJU_CITY_LATITUDE = 33.4996;
const JEJU_CITY_LONGITUDE = 126.5312;

const weatherCodeSummaryMap: Record<number, string> = {
  0: "맑고 산뜻해요",
  1: "대체로 맑아요",
  2: "구름이 조금 있어요",
  3: "흐린 편이에요",
  45: "안개가 짙어요",
  48: "서리가 낀 안개예요",
  51: "가벼운 이슬비가 내려요",
  53: "이슬비가 이어져요",
  55: "짙은 이슬비가 내려요",
  61: "비가 조금 내려요",
  63: "비가 내리고 있어요",
  65: "비가 강하게 내려요",
  71: "눈이 조금 와요",
  73: "눈이 내려요",
  75: "눈이 많이 와요",
  80: "소나기가 지나가요",
  81: "소나기가 내려요",
  82: "강한 소나기가 내려요",
  95: "뇌우 가능성이 있어요",
};

const dayLabelFormatter = new Intl.DateTimeFormat("ko-KR", {
  weekday: "short",
});

const formatDayLabel = (dateText: string, index: number) => {
  if (index === 0) return "오늘";
  if (index === 1) return "내일";

  const weekday = dayLabelFormatter.format(new Date(dateText));
  return weekday.replace("요일", "");
};

const formatTemperature = (value: number) => `${value}°`;

const formatPercent = (value: number) => `${Math.round(value)}%`;

const formatUvLabel = (value: number) => {
  if (value < 3) return "낮음";
  if (value < 6) return "보통";
  if (value < 8) return "높음";
  if (value < 11) return "매우 높음";
  return "위험";
};

export const getJejuWeather = async (): Promise<IJejuWeather> => {
  const params = new URLSearchParams({
    latitude: String(JEJU_CITY_LATITUDE),
    longitude: String(JEJU_CITY_LONGITUDE),
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "weather_code",
      "is_day",
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "precipitation_probability_max",
      "uv_index_max",
    ].join(","),
    timezone: "Asia/Seoul",
    forecast_days: "7",
  });

  const response = await fetch(`${OPEN_METEO_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Fail to fetch Jeju weather.");
  }

  const data = (await response.json()) as IOpenMeteoResponse;
  const summary =
    weatherCodeSummaryMap[data.current.weather_code] ??
    "제주 날씨를 확인해 보세요";

  return {
    locationLabel: "제주시 · 지금",
    summary,
    temperature: formatTemperature(data.current.temperature_2m),
    apparentTemperature: formatTemperature(data.current.apparent_temperature),
    humidity: formatPercent(data.current.relative_humidity_2m),
    windSpeed: `${Math.round(data.current.wind_speed_10m)}m/s`,
    uvIndex: formatUvLabel(data.daily.uv_index_max[0] ?? 0),
    weatherCode: data.current.weather_code,
    isDay: data.current.is_day === 1,
    forecast: data.daily.time.map((dateText, index) => ({
      day: formatDayLabel(dateText, index),
      temperature: formatTemperature(data.daily.temperature_2m_max[index] ?? 0),
      rainProbability: formatPercent(
        data.daily.precipitation_probability_max[index] ?? 0,
      ),
      weatherCode: data.daily.weather_code[index] ?? 0,
    })),
  };
};

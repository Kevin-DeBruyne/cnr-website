export interface CurrentWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  formattedDate: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
  precipitationProbability: number;
  uvIndexMax: number;
}

export interface HourlyForecast {
  time: string;
  hourLabel: string;
  temperature: number;
  precipitationProbability: number;
  weatherCode: number;
  isDawnOrDusk: boolean;
}

export interface CorbettWeatherData {
  locationName: string;
  coordinates: { lat: number; lng: number; elevation: number };
  timezone: string;
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  lastUpdated: string;
  isLive: boolean;
}

// Seasonal fallback data for Jim Corbett National Park if offline or network fails
const FALLBACK_WEATHER: CorbettWeatherData = {
  locationName: 'Jim Corbett National Park (Khichri River Valley)',
  coordinates: { lat: 29.3949, lng: 79.1309, elevation: 354 },
  timezone: 'Asia/Kolkata',
  current: {
    time: new Date().toISOString(),
    temperature: 24,
    apparentTemperature: 23,
    humidity: 58,
    windSpeed: 7,
    precipitation: 0,
    weatherCode: 0,
    isDay: true,
  },
  daily: [
    {
      date: new Date().toISOString().split('T')[0],
      dayName: 'Today',
      formattedDate: 'Oct 24',
      weatherCode: 0,
      tempMax: 28,
      tempMin: 15,
      sunrise: '06:24 AM',
      sunset: '05:38 PM',
      precipitationProbability: 5,
      uvIndexMax: 6,
    },
    {
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      dayName: 'Tomorrow',
      formattedDate: 'Oct 25',
      weatherCode: 1,
      tempMax: 29,
      tempMin: 15,
      sunrise: '06:25 AM',
      sunset: '05:37 PM',
      precipitationProbability: 10,
      uvIndexMax: 6,
    },
    {
      date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      dayName: 'Sunday',
      formattedDate: 'Oct 26',
      weatherCode: 2,
      tempMax: 27,
      tempMin: 14,
      sunrise: '06:26 AM',
      sunset: '05:36 PM',
      precipitationProbability: 15,
      uvIndexMax: 5,
    },
    {
      date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
      dayName: 'Monday',
      formattedDate: 'Oct 27',
      weatherCode: 0,
      tempMax: 28,
      tempMin: 14,
      sunrise: '06:26 AM',
      sunset: '05:35 PM',
      precipitationProbability: 0,
      uvIndexMax: 6,
    },
    {
      date: new Date(Date.now() + 345600000).toISOString().split('T')[0],
      dayName: 'Tuesday',
      formattedDate: 'Oct 28',
      weatherCode: 0,
      tempMax: 29,
      tempMin: 13,
      sunrise: '06:27 AM',
      sunset: '05:34 PM',
      precipitationProbability: 0,
      uvIndexMax: 6,
    },
    {
      date: new Date(Date.now() + 432000000).toISOString().split('T')[0],
      dayName: 'Wednesday',
      formattedDate: 'Oct 29',
      weatherCode: 1,
      tempMax: 28,
      tempMin: 13,
      sunrise: '06:28 AM',
      sunset: '05:33 PM',
      precipitationProbability: 5,
      uvIndexMax: 5,
    },
    {
      date: new Date(Date.now() + 518400000).toISOString().split('T')[0],
      dayName: 'Thursday',
      formattedDate: 'Oct 30',
      weatherCode: 0,
      tempMax: 28,
      tempMin: 13,
      sunrise: '06:29 AM',
      sunset: '05:32 PM',
      precipitationProbability: 0,
      uvIndexMax: 6,
    },
  ],
  hourly: [
    { time: '06:00', hourLabel: '6 AM', temperature: 15, precipitationProbability: 5, weatherCode: 45, isDawnOrDusk: true },
    { time: '08:00', hourLabel: '8 AM', temperature: 19, precipitationProbability: 5, weatherCode: 0, isDawnOrDusk: false },
    { time: '10:00', hourLabel: '10 AM', temperature: 24, precipitationProbability: 0, weatherCode: 0, isDawnOrDusk: false },
    { time: '12:00', hourLabel: '12 PM', temperature: 27, precipitationProbability: 0, weatherCode: 0, isDawnOrDusk: false },
    { time: '14:00', hourLabel: '2 PM', temperature: 28, precipitationProbability: 5, weatherCode: 1, isDawnOrDusk: false },
    { time: '16:00', hourLabel: '4 PM', temperature: 26, precipitationProbability: 5, weatherCode: 0, isDawnOrDusk: false },
    { time: '18:00', hourLabel: '6 PM', temperature: 22, precipitationProbability: 0, weatherCode: 0, isDawnOrDusk: true },
    { time: '20:00', hourLabel: '8 PM', temperature: 19, precipitationProbability: 0, weatherCode: 0, isDawnOrDusk: false },
    { time: '22:00', hourLabel: '10 PM', temperature: 17, precipitationProbability: 0, weatherCode: 0, isDawnOrDusk: false },
  ],
  lastUpdated: 'Live seasonal forecast',
  isLive: false,
};

let cachedData: CorbettWeatherData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes cache

export function formatTimeFromIso(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    });
  } catch {
    return isoString;
  }
}

export function getWeatherDescription(code: number): {
  label: string;
  tagline: string;
  safariImpact: string;
  campfireImpact: string;
} {
  switch (code) {
    case 0:
      return {
        label: 'Clear Sky',
        tagline: 'Bright Himalayan blue sky with crisp sunlight',
        safariImpact: 'Crisp visibility across grasslands; prime morning tiger tracking & predator spotting.',
        campfireImpact: 'Starlit night with exceptional stargazing and clear Milky Way viewing by the river.',
      };
    case 1:
      return {
        label: 'Mainly Clear',
        tagline: 'Gentle whisps of clouds with warm sun',
        safariImpact: 'Gentle lighting conditions ideal for wildlife telephoto photography.',
        campfireImpact: 'Pleasant evening with crisp mountain air; perfect campfire ambiance.',
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        tagline: 'Filtered sunlight through soft cloud cover',
        safariImpact: 'Mild temperatures keep big cats active longer along open riverbeds.',
        campfireImpact: 'Cozy night by the hearth fire; gentle forest breeze.',
      };
    case 3:
      return {
        label: 'Overcast',
        tagline: 'Diffuse cloud canopy across the Shivalik foothills',
        safariImpact: 'Reduced glare allows excellent deer and elephant viewing in the Sal forest.',
        campfireImpact: 'Pleasant night; roaring bonfire keeps the river chill at bay.',
      };
    case 45:
    case 48:
      return {
        label: 'Forest Mist / Fog',
        tagline: 'Mystic morning mist rising from the Khichri River',
        safariImpact: 'Atmospheric dawn safari; carry warm windproof layers for the open 4x4 Gypsy ride.',
        campfireImpact: 'Enchanting atmospheric evening; campfire provides comforting warmth.',
      };
    case 51:
    case 53:
    case 55:
      return {
        label: 'Light Drizzle',
        tagline: 'Soft occasional raindrops refreshing the forest',
        safariImpact: 'Fresh jungle scents enhance pugmark tracking; gypsies use roll-down canvas tops.',
        campfireImpact: 'Campfire sheltered under the central covered fire area.',
      };
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return {
        label: 'Rain Showers',
        tagline: 'Rejuvenating mountain showers over Corbett buffer zone',
        safariImpact: 'Rain poncho recommended; animals often assemble near sheltering tree clusters.',
        campfireImpact: 'Meals served warm inside our common restaurant hall or delivered to cottage balconies.',
      };
    case 95:
    case 96:
    case 99:
      return {
        label: 'Thunderstorm',
        tagline: 'Dramatic thunder & rain over the Kumaon hills',
        safariImpact: 'Safaris monitored closely by forest rangers; trails may be adjusted.',
        campfireImpact: 'Indoor common restaurant hall with hot spiced Kumaoni herbal tea and cozy seating.',
      };
    default:
      return {
        label: 'Pleasant Forest Weather',
        tagline: 'Typical sub-Himalayan foothill climate',
        safariImpact: 'Favorable safari conditions across all reserve zones.',
        campfireImpact: 'Standard campfire setup in full operation.',
      };
  }
}

export async function fetchCorbettWeather(forceRefresh = false): Promise<CorbettWeatherData> {
  const now = Date.now();
  if (!forceRefresh && cachedData && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedData;
  }

  const lat = 29.3949;
  const lng = 79.1309;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max&timezone=Asia%2FKolkata&forecast_days=7`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Open-Meteo returned status ${res.status}`);
    }
    const data = await res.json();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Map daily forecast
    const daily: DailyForecast[] = (data.daily?.time || []).map((dateStr: string, idx: number) => {
      const dateObj = new Date(dateStr + 'T12:00:00Z');
      const isToday = idx === 0;
      const isTomorrow = idx === 1;
      const dayName = isToday ? 'Today' : isTomorrow ? 'Tomorrow' : daysOfWeek[dateObj.getDay()];
      const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      return {
        date: dateStr,
        dayName,
        formattedDate,
        weatherCode: data.daily.weather_code?.[idx] ?? 0,
        tempMax: Math.round(data.daily.temperature_2m_max?.[idx] ?? 26),
        tempMin: Math.round(data.daily.temperature_2m_min?.[idx] ?? 14),
        sunrise: formatTimeFromIso(data.daily.sunrise?.[idx] || ''),
        sunset: formatTimeFromIso(data.daily.sunset?.[idx] || ''),
        precipitationProbability: data.daily.precipitation_probability_max?.[idx] ?? 0,
        uvIndexMax: Math.round(data.daily.uv_index_max?.[idx] ?? 5),
      };
    });

    // Map hourly forecast (next 12-16 hours)
    const currentIsoPrefix = (data.current?.time || '').slice(0, 13);
    const hourlyTimes: string[] = data.hourly?.time || [];
    let currentHourIndex = hourlyTimes.findIndex((t: string) => t.startsWith(currentIsoPrefix));
    if (currentHourIndex < 0) currentHourIndex = 0;

    const hourlySlice = hourlyTimes.slice(currentHourIndex, currentHourIndex + 14);
    const hourly: HourlyForecast[] = hourlySlice.map((timeStr: string, offset: number) => {
      const actualIdx = currentHourIndex + offset;
      const hourNumber = parseInt(timeStr.slice(11, 13), 10);
      const ampm = hourNumber >= 12 ? 'PM' : 'AM';
      const displayHour = hourNumber % 12 === 0 ? 12 : hourNumber % 12;
      const isDawnOrDusk = (hourNumber >= 5 && hourNumber <= 7) || (hourNumber >= 17 && hourNumber <= 19);

      return {
        time: timeStr.slice(11, 16),
        hourLabel: `${displayHour} ${ampm}`,
        temperature: Math.round(data.hourly.temperature_2m?.[actualIdx] ?? 22),
        precipitationProbability: data.hourly.precipitation_probability?.[actualIdx] ?? 0,
        weatherCode: data.hourly.weather_code?.[actualIdx] ?? 0,
        isDawnOrDusk,
      };
    });

    const result: CorbettWeatherData = {
      locationName: 'Jim Corbett National Park (Khichri River & Ramnagar)',
      coordinates: {
        lat: Number(data.latitude?.toFixed(4) || lat),
        lng: Number(data.longitude?.toFixed(4) || lng),
        elevation: Math.round(data.elevation || 354),
      },
      timezone: data.timezone || 'Asia/Kolkata',
      current: {
        time: data.current?.time || new Date().toISOString(),
        temperature: Math.round(data.current?.temperature_2m ?? 24),
        apparentTemperature: Math.round(data.current?.apparent_temperature ?? 23),
        humidity: Math.round(data.current?.relative_humidity_2m ?? 55),
        windSpeed: Math.round(data.current?.wind_speed_10m ?? 8),
        precipitation: data.current?.precipitation ?? 0,
        weatherCode: data.current?.weather_code ?? 0,
        isDay: Boolean(data.current?.is_day),
      },
      daily: daily.length > 0 ? daily : FALLBACK_WEATHER.daily,
      hourly: hourly.length > 0 ? hourly : FALLBACK_WEATHER.hourly,
      lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      isLive: true,
    };

    cachedData = result;
    lastFetchTime = now;
    return result;
  } catch (err) {
    console.warn('Failed to fetch live Corbett weather data, falling back to local seasonal data:', err);
    return FALLBACK_WEATHER;
  }
}

// backend
export const backendRootUrl = 'http://127.0.0.1:8000';
export const backendWeatherVotesUrl = `${backendRootUrl}/weather/votes`;
export const backendWeatherVoteUrl = `${backendRootUrl}/weather/vote`;

// weather
export const currentWeatherUrl = (city: string, apiKey: string) =>
  `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
export const weatherForecastUrl = (city: string, apiKey: string) =>
  `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
export const weatherIconUrl = (id: string) => `https://openweathermap.org/img/wn/${id}@2x.png`;
export const moonInformationUrl = (date: string) => `https://mgpn.org/api/moon/v2position.cgi?time=${date}T12:00&lat=35.00&lon=135.00`;

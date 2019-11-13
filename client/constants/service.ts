import Axios from 'axios';

export const getCurrentWeather = (city: string) => {
  return callApi('current',city)
}

export const getForecast = (city: string) => {
  return callApi('forecast', city)
}
const callApi = (endpoint: string, city: string) => {
  return Axios.get(`/v1/${endpoint}/${city}`)
}
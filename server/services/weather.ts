import config from '../config';
import axios from 'axios';
import { Forecast, Weather } from '../types/weather'

class WeatherService {
    baseUrl = config.rest.weather
    endpoints = {
        forecast : "/forecast",
        weather: "/weather"
    }
    params = { 
        appid : config.apiKeys.weather,
        units: 'metric'
    }
    constructor(){}
    getCurrentWeather(city: string) {
        return axios.get<Weather>(this.baseUrl.concat(this.endpoints.weather),{
            params: {
                ...this.params,
                q: city
            }
        });
    }
    getForecast(city: string) {
        return axios.get<Forecast>(this.baseUrl.concat(this.endpoints.forecast),{
            params: {
                ...this.params,
                q: city
            }
        });
    }
    
}

export default new WeatherService;
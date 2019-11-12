import config from '../config';
import axios from 'axios';
import { Forecast, Weather } from '../types/weather'

class WeatherService {
    baseUrl = config.rest.weather
    endpoints = {
        forecast : "/forecast",
        weather: "/weather"
    }
    apiKey = { 
        "appid" : config.apiKeys.weather
    }
    constructor(){}
    getCurrentWeather(city: string) {
        return axios.get<Weather>(this.baseUrl.concat(this.endpoints.weather),{
            params: {
                ...this.apiKey,
                q: city
            }
        });
    }
    getForecast(city: string) {
        return axios.get<Forecast>(this.baseUrl.concat(this.endpoints.forecast),{
            params: {
                ...this.apiKey,
                q: city
            }
        });
    }
    
}

export default new WeatherService;
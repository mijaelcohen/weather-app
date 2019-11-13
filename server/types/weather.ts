export type Forecast = {
    list:ForecastItem[]
}

type ForecastItem = {
    dt: number
    main : MainWeatherInfo 
    weather: WeatherItem[],
    wind:{speed:number,deg:number},
    dt_txt: string,
};
export type MainWeatherInfo = {
    temp:number,
    temp_min:number,
    temp_max:number,
    pressure:number,
    sea_level:number,
    grnd_level:number,
    humidity:number,
    temp_kf:number 
}
export type WeatherItem = {
    id: number,
    main: string,
    description: string,
    icon: string,
}
// Maping only needed data
export type Weather = {
    main: MainWeatherInfo
    weather: WeatherItem[],
    wind: {
      speed: number,
      deg: number
    },
    clouds: {
      all: number
    },
}

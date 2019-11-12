export type Forecast = {
    list:ForecastItem[]
}

type ForecastItem = {
    dt: number
    main:{
        temp:number,
        temp_min:number,
        temp_max:number,
        pressure:number,
        sea_level:number,
        grnd_level:number,
        humidity:number,
        temp_kf:number 
    },
    weather: WeatherItem[],
    wind:{speed:number,deg:number},
};

export type WeatherItem = {
    id: number,
    main: string,
    description: string,
    icon: string,
}
// Maping only needed data
export type Weather = {
    main: {
      temp: number
      pressure: number,
      humidity: number,
      temp_min: number,
      temp_max: number
    },
    weather: WeatherItem[],
    wind: {
      speed: number,
      deg: number
    },
    clouds: {
      all: number
    },
}

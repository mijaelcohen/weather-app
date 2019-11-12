import { WeatherItem, Weather } from "../../server/types/weather";
import * as React from 'react';

type Props = {
    weather : WeatherItem
    main: Weather
}
export const SingleWeather = (props: Props) => {
    const iconURL = "http://openweathermap.org/img/wn/";
    const weather = props.weather;
    return (
        <div className="current-weather">
            <img src={`${iconURL+weather.icon}.png`}/>
            <span className="temp">{main}º</span>
            <p>{weather.description}</p>
        </div>
    )
}
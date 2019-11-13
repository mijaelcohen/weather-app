import { WeatherItem, MainWeatherInfo } from "../../server/types/weather";
import * as React from 'react';

type Props = {
    item : WeatherItem
    main: MainWeatherInfo
}
export const SingleWeather = (props: Props) => {
    const iconURL = "http://openweathermap.org/img/wn/";
    const item = props.item;
    const weather = props.main;
    return (
        <div className="current-weather">
            <img src={`${iconURL+item.icon}.png`}/>
            <span className="temp">{weather.temp}º</span>
            <p>{item.description}</p>
        </div>
    )
}
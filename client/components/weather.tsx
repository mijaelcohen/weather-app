import { WeatherItem, MainWeatherInfo } from "../../server/types/weather";
import * as React from 'react';
import {Card, CardMedia, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 200,
    height: 200
  },
  image: {
    height: 100,
    width: 100,
    margin: '0 auto'
  },
});

type Props = {
    item : WeatherItem
    main: MainWeatherInfo
}
export const SingleWeather = (props: Props) => {
    const iconURL = "http://openweathermap.org/img/wn/";
    const item = props.item;
    const weather = props.main;
    const styles = useStyles({});
    const image = `${iconURL+item.icon}.png`
    return (
            <Card  className={styles.card} >
                <CardMedia
                  className={styles.image}
                  component="img"
                  
                  image={image}
                  title={item.description}
                />
                <Typography variant="h3" align="center">{weather.temp}º</Typography>
                <Typography variant="body1" align="center">{item.description}</Typography>
            </Card>
    )
}
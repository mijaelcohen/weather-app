import * as React from 'react';
import WeatherComponent from './CurrentWeather';
import ForecastComponent from './Forecast';
import Typography from '@material-ui/core/Typography';
type Props = {
    city: string,
}

export default class CurrentCity extends React.Component<Props>{
    constructor(props: Props){
        super(props)
    }
    
    render(){
      return <React.Fragment>
            <Typography variant="h5" align="center">Today's weather in {this.props.city}</Typography>
            <WeatherComponent  city={this.props.city}/>
            <ForecastComponent city={this.props.city}/>
        </React.Fragment>  
    }
}
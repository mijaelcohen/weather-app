import * as React from 'react';
import WeatherComponent from './CurrentWeather';
import ForecastComponent from './Forecast';

type Props = {
    city: string,
}

export default class CurrentCity extends React.Component<Props>{
    constructor(props: Props){
        super(props)
    }
    
    render(){
      return <React.Fragment>
            <WeatherComponent  city={this.props.city}/>
            <ForecastComponent city={this.props.city}/>
      </React.Fragment>  
    }
}
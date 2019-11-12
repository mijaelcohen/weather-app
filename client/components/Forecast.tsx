import * as React from 'react';
import Axios from 'axios';
import { Forecast } from '../../server/types/weather';
import { CircularProgress } from '@material-ui/core';
import { SingleWeather } from './weather';

type Props = {
    city: string,
}

type State = {
    loadingWeather: boolean,
    errorMessage: string,
    forecast : Forecast,
}

export default class ForecastComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            loadingWeather: true,
            errorMessage: '',
            forecast : null,
        }
    }
    componentDidMount(){
        Axios.get(`/v1/forecast/${this.props.city}`)
        .then((response)=>{
            this.setState({
                forecast: response.data,
                loadingWeather: false,
            })
        })
        .catch((error)=>{
            this.setState({
                errorMessage: "Forecast not available",
                loadingWeather: false,
            })
        })
    }
    render(){
        const iconURL = "http://openweathermap.org/img/wn/";
        const forecast = this.state.forecast;
        return<React.Fragment>
            {
                forecast ? 
                <div className="forecast">
                   {forecast.list.map(item=>{
                       <SingleWeather weather={item.weather}/>
                       
                   })}
                </div>
                :
                <CircularProgress/>
            }
            
        </React.Fragment>
    }
}
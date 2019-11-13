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
    getFormatedDate(d: string){
        const date = new Date(d);
        return date
    }
    render(){
        const forecast = this.state.forecast;
        return<React.Fragment>
            <h2>Forecast</h2>
            {
                forecast ? 
                <div className="forecast">
                   {forecast.list.map(item=>{
                       return (
                       <React.Fragment key={item.dt}>
                            {(item.dt_txt)}
                            <SingleWeather main={item.main} item={item.weather[0]}/>
                       </React.Fragment>
                       )
                   })}
                </div>
                :
                <CircularProgress/>
            }
            
        </React.Fragment>
    }
}
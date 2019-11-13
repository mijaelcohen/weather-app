import * as React from 'react';
import { Forecast } from '../../server/types/weather';
import { CircularProgress } from '@material-ui/core';
import { SingleWeather } from './weather';
import { getForecast } from '../constants/service';

type Props = {
    city: string,
}

type State = {
    loading: boolean,
    errorMessage: string,
    forecast : Forecast,
}

export default class ForecastComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            loading: true,
            errorMessage: '',
            forecast : null,
        }
    }
    getForecast(city: string){
        getForecast(city).then((response)=>{
            this.setState({
                forecast: response.data,
                loading: false,
            });
        })
        .catch((error)=>{
            this.setState({
                errorMessage: "Forecast not available",
                loading: false,
            });
        })
    }
    componentDidUpdate(nextProps: Props){
        const { city } = this.props
        if (nextProps.city !== city) {
            this.setState({
                loading: true,
            });    
            this.getForecast(nextProps.city);
        }
    }
    componentDidMount(){
        if(this.props.city)
            this.getForecast(this.props.city)
    }
    getFormatedDate(d: string){
        const date = new Date(d);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    filterForecast(forecast: Forecast){
        
    }
    render(){
        const {forecast, loading} = this.state;
        return<React.Fragment>
            <h2>Forecast</h2>
            {
                !loading ? 
                <div className="forecast">
                   {forecast.list.map(item=>{
                       return (
                       <React.Fragment key={item.dt}>
                            {this.getFormatedDate(item.dt_txt)}
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
import * as React from 'react';
import { Forecast, ForecastItem } from '../../server/types/weather';
import { CircularProgress, Grid } from '@material-ui/core';
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
    filterForecast(forecast: Forecast) : ForecastItem[] | null{
        // not my proudest method
        if(forecast){
            return  forecast.list.filter((item)=>{
                return item.dt_txt.substr(item.dt_txt.length - 8) === "00:00:00"; 
            })
        }else{
            return null;
        }
    }
    render(){
        const {forecast, loading} = this.state;
        const forecastByDay = this.filterForecast(forecast)

        return<React.Fragment>
            <h2>Forecast</h2>
            {
                !loading ? 
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={5}
                >
                   {forecastByDay.map(item=>{
                       return (
                       <Grid xs={4} item key={item.dt}>
                            {this.getFormatedDate(item.dt_txt)}
                            <SingleWeather main={item.main} item={item.weather[0]}/>
                       </Grid>
                       )
                   })}
                </Grid>
                :
                <CircularProgress/>
            }
            
        </React.Fragment>
    }
}
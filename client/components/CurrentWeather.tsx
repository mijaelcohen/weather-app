import * as React from 'react';
import { Weather } from '../../server/types/weather';
import { CircularProgress } from '@material-ui/core';
import { SingleWeather } from './weather';
import { getCurrentWeather } from '../constants/service';

type Props = {
    city: string,
}

type State = {
    loading: boolean,
    errorMessage: string,
    weather : Weather,
}

export default class WeatherComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            loading: true,
            errorMessage: '',
            weather : null,
        }
    }
    getCurrentWeather(city: string){
        getCurrentWeather(city)
        .then((response)=>{
            this.setState({
                weather: response.data,
                loading: false,
            })
        })
        .catch((error)=>{
            this.setState({
                errorMessage: "Weather not available",
                loading: false,
            })
        })
    }

    componentDidMount(){
        if(this.props.city)
            this.getCurrentWeather(this.props.city);
    }

    componentDidUpdate(nextProps: Props){
        const { city } = this.props
        
        if (nextProps.city !== city) {
            this.setState({
                loading: true,
            })
            this.getCurrentWeather(nextProps.city);
        }
    }
    render(){
        const {weather, loading} = this.state;
        return<React.Fragment>
            {!loading ? 
                <SingleWeather item={weather.weather[0]} main={weather.main}/>
                :
                <CircularProgress/>
            }
        </React.Fragment>
    }
}
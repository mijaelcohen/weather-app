import * as React from 'react';
import Axios from 'axios';
import { Weather } from '../../server/types/weather';
import { CircularProgress } from '@material-ui/core';
import { SingleWeather } from './weather';

type Props = {
    city: string,
}

type State = {
    loadingWeather: boolean,
    errorMessage: string,
    weather : Weather,
}

export default class WeatherComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            loadingWeather: true,
            errorMessage: '',
            weather : null,
        }
    }
    componentDidMount(){
        Axios.get(`/v1/current/${this.props.city}`)
        .then((response)=>{
            this.setState({
                weather: response.data,
                loadingWeather: false,
            })
        })
        .catch((error)=>{
            this.setState({
                errorMessage: "Weather not available",
                loadingWeather: false,
            })
        })
    }
    render(){
        return<React.Fragment>
            {
                this.state.weather ? 
                <SingleWeather weather={this.state.weather}/>
                :
                <CircularProgress/>
            }
            
        </React.Fragment>
    }
}
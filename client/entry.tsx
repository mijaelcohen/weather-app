import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Axios from 'axios';
import { cities } from './constants/cities';
import CurrentCity from './components/CurrentCity';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

type State = {
  city: string,
  loading: boolean,
  userCity: string
}

class App extends React.Component <any, State>{
  constructor(props: any){
    super(props);
    this.state = {
      city: null,
      loading: true,
      userCity: null,
    }
  }
  componentDidMount(){
    //get location by client's ip
    Axios.get("http://ip-api.com/json")
    .then((response)=>{
      this.setState({
        city: response.data.city,
        loading: false,
        userCity: response.data.city,
      })
    })
    .catch((error)=>{
      this.setState({
        city: '',
        loading: false,
      })
    })
  }
  changeCity(event: React.ChangeEvent<HTMLInputElement>){
    this.setState({
      city: event.target.value
    });
  }
  render() {
      const {city, userCity, loading } = this.state;
      return (
        <div>
          <h1> Select a city to see weather </h1>
          {loading ? 
            <CircularProgress />
            :
            <div>
              <Select value={city} onChange={(e: any)=>{this.changeCity(e)}}>
                <MenuItem value={userCity}>{userCity}</MenuItem>
                {cities.map((option) =>
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                )}
              </Select>
              <CurrentCity city={city} />
            </div>
            
          }
          
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('weather-app')
  );